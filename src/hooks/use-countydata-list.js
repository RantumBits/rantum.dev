// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const useCountyDataList = () => {
  const { allGoogleSheetCountyDataRow } = useStaticQuery(
    graphql`
      query CountyDataListQuery {
        allGoogleSheetCountyDataRow {
          edges {
            node {
              caserate
              caseratetier2
              caseratetier3
              caseratetier4
              county
              date
              id
              positiverate
              positiveratetier2
              positiveratetier3
              positiveratetier4
              prelimtier
              prevtier
              tier
              positiveweeks
              negativeweeks
            }
          }
        }
      }
    `
  );

  return allGoogleSheetCountyDataRow.edges;
};

export default useCountyDataList;
