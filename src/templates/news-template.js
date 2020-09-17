// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import RelatedPosts from '../components/RelatedPosts';
import { useSiteMetadata, usePostsList } from '../hooks';

const NewsTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title, excerpt, articleid, author, source,text, dateadded, highlight, highlight2, url, tags,image,  comment, keywords, publishdate, extractedkeywords } = data.news;
  const metaDescription = excerpt !== null ? excerpt : siteSubtitle;

  return (
    <Layout title={`${title} - ${siteTitle}`} description={metaDescription} >
      <Sidebar isIndex />

      <Page title={title}>
      <div>

      <img src={image} alt={title} />
      </div>
        <div>



<h3><a href={url}>{title}</a></h3>
            <p>{comment}</p>

            By {author} at {source}<br/>

            <blockquote>{highlight}</blockquote>
            <blockquote>{highlight2}</blockquote>
              article date: {publishdate}<br/>
              posted: {dateadded}<br/>

            <p><a href={url} target="_blank" >Read the original post &gt;</a></p>

            {extractedkeywords}
        </div>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query NewsPost($id: String!) {
    news: googleSheetLinksRow(id: { eq: $id }) {
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
`;

export default NewsTemplate;
