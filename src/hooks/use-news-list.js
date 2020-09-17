// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const useNewsList = () => {
  const { allGoogleSheetLinksRow } = useStaticQuery(
    graphql`
      query NewsListQuery {
        allGoogleSheetLinksRow(sort: {fields: dateadded, order: DESC}) {
          edges {
            node {
              articleid
              author
              dateadded
              comment
              excerpt
              extractedkeywords
              highlight
              highlight2
              images
              image
              id
              keywords
              publishdate
              source
              source2
              tags
              text
              title
              url
              popularity
            }
          }
        }
      }
    `
  );

  return allGoogleSheetLinksRow.edges;
};

export default useNewsList;
