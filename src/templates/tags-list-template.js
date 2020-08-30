// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';
import _ from 'lodash';

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();
  let processedList = [];
    tags && tags.map((tag) => {
        const filteredList = _.filter(processedList, (item) => (item != null && tag != null && item.fieldValue.toLowerCase() == tag.fieldValue.toLowerCase()))
        var index = _.findIndex(processedList, (item) => (item != null && tag != null && item.fieldValue.toLowerCase() == tag.fieldValue.toLowerCase()))
        if (filteredList.length > 0) {//means the tag is already present. Just add the count
            processedList[index] = {
                fieldValue: filteredList[0].fieldValue,
                totalCount: filteredList[0].totalCount + tag.totalCount
            }
        } else {
            processedList.push({
                fieldValue: tag.fieldValue.toLowerCase(),
                totalCount: tag.totalCount
            })
        }
    })
    const sortedList = _.sortBy(processedList, obj => obj.fieldValue)

  return (
    <Layout title={`Tags - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Tags">
        <ul>
          {sortedList && sortedList.map((tag) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export default TagsListTemplate;
