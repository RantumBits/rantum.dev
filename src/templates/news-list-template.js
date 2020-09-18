// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata, useNewsList } from '../hooks';
import './news-list-template.css'

const NewsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const allNews = useNewsList();

  return (
    <Layout title={`Links - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Links">
          <div className="newsContainer">
              {allNews && allNews.map(({ node }, index) => (
                  <div key={index}>
                      <img src={'https://source.unsplash.com/1600x900/?abstract.'+ node.articleid} alt={node.title} />
                      <Link to={`/links/${node.articleid}`}>
                          {node.title && <h3>{node.title}</h3>}
                      </Link>
                      <div>{node.comment}</div>
                      <div>From {node.author} at {node.source}</div>
                      {node.highlight && <blockquote>{node.highlight}</blockquote>}
                      {node.highlight2 && <blockquote>{node.highlight2}</blockquote>}
                      <p><a href={node.url} target="_blank" >Read the original post &gt;</a></p>
                  </div>
              ))}
          </div>
        }
      </Page>
    </Layout>
  );
};

export default NewsListTemplate;
