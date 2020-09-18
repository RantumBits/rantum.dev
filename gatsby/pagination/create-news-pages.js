'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {

	const result = await graphql(`
    {
			allGoogleSheetLinksRow(sort: {fields: dateadded, order: DESC}) {
				edges {
					node {
						id
						articleid
						title
					}
					next {
						articleid
					}
					previous {
						articleid
					}
				}
			}
		}
  `);

	const { createPage } = actions;
  const { postsPerPage } = siteConfig;
	
	_.each(result.data.allGoogleSheetLinksRow.edges, ({node, next, previous}) => {
		createPage({
      path: `/links/${node.articleid}`,
      component: path.resolve('./src/templates/news-template.js'),
      context: {
        id: node.id,
				nextid: next?next.articleid:null,
				previousid: previous?previous.articleid:null
      }
    });
	})
};
