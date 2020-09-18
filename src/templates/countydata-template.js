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
  
  const allCounties = allCountyData.map(({node}) => node.county);
  //console.log("**** allCounties ",allCounties)
  
  const handleChange = (event) => {
    if(event.target.value==null || event.target.value.length<=0) return;
    //this.setState({value: event.target.value});
    console.log("**** event.target.value ",event.target.value)
    let countyData = _.find(allCountyData, ({node}) => node.county==event.target.value)
    console.log("****** countyData ",countyData);
    
    const lineChartData = {
      labels: [countyData.node.date],
      datasets: [        
        {
          name: 'case_rate',
          type: 'line',
          values: [countyData.node.caseratetier2, countyData.node.caseratetier3,countyData.node.caseratetier4]
        }
      ]
    };
    console.log("**** linechartdata ",lineChartData)
    
    setSelectedCountyLineData(lineChartData);
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
                colors={"purple","light-blue"}
                height={250}
                axisOptions={{ xAxisMode: "tick", xIsSeries: 1 }}
                data={selectedCountyLineData}
            />
          }
      </Page>
    </Layout>
  );
};

export default CountyDataTemplate;
