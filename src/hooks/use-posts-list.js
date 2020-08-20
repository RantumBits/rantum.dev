// @flow strict
import { useStaticQuery, graphql } from 'gatsby';

const usePostsList = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
        query PostsListQuery {
            allMarkdownRemark(filter: {frontmatter: {template: {eq: "post"}}}) {
            edges {
                node {
                    id
                    html
                    fields {
                        slug
                        tagSlugs
                    }
                    frontmatter {
                        title
                        date
                        description
                        socialImage
                        slug
                        featuredImage
                        tags
                        category
                        template
                    }
                }
            }
        }
      }
    `
    );

    return allMarkdownRemark.edges;
};

export default usePostsList;
