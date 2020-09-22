// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useCountyDataList } from '../hooks';
import ReactFrappeChart from "react-frappe-charts";
import './countydata-template.css'

const CountyDataTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const allCountyData = useCountyDataList();
  const [selectedCountyLineData, setSelectedCountyLineData] = React.useState();
  const [selectedCountyPercentData, setSelectedCountyPercentData] = React.useState();

  const allCounties = allCountyData.map(({node}) => node.county);
  //console.log("**** allCounties ",allCounties)

  const handleChange = (event) => {
    if(event.target.value==null || event.target.value.length<=0) {
      setSelectedCountyLineData(null);
      setSelectedCountyPercentData(null)
      return;
    }
    //console.log("**** event.target.value'"+event.target.value+"'")
    let countyData = _.filter(allCountyData, ({node}) => node.county && node.county.indexOf(event.target.value)>=0)
    //console.log("****** countyData ",countyData);
    
    if(!countyData || countyData.length<=0) { // if not county data found then reset the chart
      setSelectedCountyLineData(null);
      setSelectedCountyPercentData(null);
      return;
    }

    const lineChartData = {
      labels: countyData.map(({node}) => node.date),
      datasets: [
        {
          name: 'case rate',
          type: 'line',
          values: countyData.map(({node}) => node.caserate),
        },
        {
          name: 'positivity rate',
          type: 'line',
          values: countyData.map(({node}) => node.positiverate),
        }
      ],
      yMarkers: [
      {
          label: "CaseRate Tier 2",
          value: countyData[0].node.caseratetier2
      },
      {
          label: "CaseRate Tier 3",
          value: countyData[0].node.caseratetier3
      },
      {
          label: "CaseRate Tier 4",
          value: countyData[0].node.caseratetier4
      },

      {
          label: "PositiveRate Tier 2",
          value: countyData[0].node.positiveratetier2,
          options: { labelPos: "left" }
      },
      {
          label: "PositiveRate Tier 3",
          value: countyData[0].node.positiveratetier3,
          options: { labelPos: "left" }
      },
      {
          label: "PositiveRate Tier 4",
          value: countyData[0].node.positiveratetier4,
          options: { labelPos: "left" }
      }

      ]
    };
    
    //console.log("***** lineChartData ",lineChartData)
    setSelectedCountyLineData(lineChartData);
    
    const sortedCountyData = _.sortBy(countyData, ({node}) => -(new Date(node.date)))
    
    const recentWeekCountyData = sortedCountyData[0].node;
    console.log("recentWeekCountyData",recentWeekCountyData)
    let positiveweeks = parseInt(recentWeekCountyData.positiveweeks)
    if (isNaN(positiveweeks)) positiveweeks = 0
    let negativeweeks = parseInt(recentWeekCountyData.negativeweeks)
    if (isNaN(negativeweeks)) negativeweeks = 0
    
    const percentChartData = {
      labels: [
        "postive_weeks", 
        "negative_weeks",
        "eq: 3-[postive_weeks + negative_weeks]"
      ],
      datasets: [
        {
          name: 'positive_week',
          type: 'percent',
          values: [positiveweeks, negativeweeks, 3-(positiveweeks+negativeweeks)],
        }
      ],      
    };
    
    //console.log("***** percentChartData ",percentChartData)
    setSelectedCountyPercentData(percentChartData);
  }

  return (
    <Layout title={`Links - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="County Data">
          <div>
            Select County :
            {allCounties && allCounties.length>0 &&
              <label className='Form--Label has-arrow' style={{width:'33%'}}>
                <select className="Form--Input Form--Select" onChange={handleChange}>
                  <option value="">--</option>
                  {allCounties.map((county, index)=>
                    <option key={index} value={county}>{county}</option>
                  )}
                </select>
              </label>
            }
          </div>
          {selectedCountyLineData &&
            <ReactFrappeChart
                type="axis-mixed"
                colors={["blue","light-blue"]}
                height={250}
                data={selectedCountyLineData}
            />
          }

          {selectedCountyPercentData &&
            <ReactFrappeChart
                type="percentage"
                colors={["green","red","grey"]}
                height={250}
                truncateLegends={true}
                data={selectedCountyPercentData}
            />
          }
      </Page>
    </Layout>
  );
};

export default CountyDataTemplate;
