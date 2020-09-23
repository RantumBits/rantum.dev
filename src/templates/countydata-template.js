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
  const [selectedCountyBarData, setSelectedCountyBarData] = React.useState();
  const [selectedCountyPercentData, setSelectedCountyPercentData] = React.useState();

  let allCounties = allCountyData.map(({node}) => node.county);
  allCounties = _.uniq(allCounties)
  allCounties = _.orderBy(allCounties)
  //console.log("**** allCounties ",allCounties)
  
  const handleChange = (event) => {
    if(event.target.value==null || event.target.value.length<=0) {
      setSelectedCountyLineData(null);
      setSelectedCountyPercentData(null)
      setSelectedCountyBarData(null)
      return;
    }
    //console.log("**** event.target.value'"+event.target.value+"'")
    let countyData = _.filter(allCountyData, ({node}) => node.county && node.county.indexOf(event.target.value)>=0)
    console.log("****** countyData ",countyData);    

    if(!countyData || countyData.length<=0) { // if not county data found then reset the chart
      setSelectedCountyLineData(null);
      setSelectedCountyPercentData(null);
      setSelectedCountyBarData(null)
      return;
    }

    const barChartData = {
      labels: countyData.map(({node}) => node.date),
      datasets: [
        {
          name: 'tier',
          chartType: 'bar',
          values: countyData.map(({node}) => node.tier),
        }
      ],
    };

setSelectedCountyBarData(barChartData);

    const lineChartData = {
      labels: countyData.map(({node}) => node.date),
      datasets: [
        {
          name: 'case rate',
          chartType: 'line',
          values: countyData.map(({node}) => node.caserate?node.caserate.toFixed(2):0),
        },
        {
          name: 'positivity rate',
          chartType: 'line',
          values: countyData.map(({node}) => node.positiverate?node.positiverate.toFixed(2):0),
        },
        {
          name: 'tier',
          chartType: 'bar',
          values: countyData.map(({node}) => node.tier),
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
        "postive weeks",
        "negative weeks",
        "next tier"
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
    <Layout title={`California County Data - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="California County Data">
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
                colors={["blue","light-blue", "#fff"]}
                height={350}
                data={selectedCountyLineData}
            />
          }

          {selectedCountyPercentData &&

            <ReactFrappeChart
              title="Progress towards new tier"
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
