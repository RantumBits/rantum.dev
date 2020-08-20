// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import { getRelatedPosts } from '../../utils';

const RelatedPosts = ({ post, allPosts }) => {

    const allRelatedPosts = (post && allPosts) ? getRelatedPosts(post, allPosts) : [];

    console.log("**** Render Related Posts")
    console.log(allRelatedPosts)

    return (
        <>
            {allRelatedPosts && allRelatedPosts.length > 0 &&
                <>
                    <h2>Related Posts</h2>
                    <div style={{ display: "table" }}>
                        {allRelatedPosts.map((item) => (
                            <div style={{ display: "table-cell", padding: "1rem", width: "33%" }}>
                                <img src={item.post.node.frontmatter.featuredImage} alt={item.post.node.frontmatter.title} />
                                <Link to={item.post.node.fields.slug}>
                                    <h3>{item.post.node.frontmatter.title}</h3>
                                </Link>
                                <div>{item.post.node.frontmatter.description}</div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}

export default RelatedPosts;
