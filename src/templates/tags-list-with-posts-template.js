// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import filter from 'lodash/filter';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList, usePostsList } from '../hooks';

const TagsPostsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();
  const allPostEdges = usePostsList();
  
  const getPostsByTag = (tag) => {
      const filteredPosts = filter(allPostEdges, ({node}) => node.frontmatter.tags.indexOf(tag)>=0)
      //console.log("********* filteredPosts")
      //console.log(filteredPosts)
      return filteredPosts
  }  

  return (
    <Layout title={`Tags - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Tags">
        <ul>
          {tags.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
              <ul>
                  {getPostsByTag(tag.fieldValue).map(({node})=>(
                  <Link to={node.fields.slug}><li>{node.frontmatter.title}</li></Link>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsPostsListTemplate;
