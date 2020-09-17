'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {

	const result = await graphql(`
    {
			allGoogleSheetLinksRow {
				edges {
					node {
						id
						articleid
						title
					}
				}
			}
		}
  `);

	const { createPage } = actions;
  const { postsPerPage } = siteConfig;
	
	_.each(result.data.allGoogleSheetLinksRow.edges, ({node}) => {
		//console.log("****** articleid ",node.articleid)
		createPage({
      path: `/news/${node.articleid}`,
      component: path.resolve('./src/templates/news-template.js'),
      context: {
        id: node.id,
      }
    });
	})
};
