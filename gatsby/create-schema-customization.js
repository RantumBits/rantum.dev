'use strict';

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type googleSheetCountyDataRow implements Node {
      positiveweeks: String      
      negativeweeks: String      
    }
  `)  
}
  
module.exports = createSchemaCustomization;
