// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import { getRelatedNews } from '../../utils/get-related-news';

const RelatedNews = ({ news, allTags, allNews }) => {

    const allRelatedNews = (news && allNews) ? getRelatedNews(news.id, allTags, allNews) : [];

    console.log("**** Render Related News")
    console.log(allRelatedNews)

    return (
        <>
            {allRelatedNews && allRelatedNews.length > 0 &&
                <>
                    <h2>Related News</h2>
                    <div style={{ display: "table" }}>
                        {allRelatedNews.map((item,index) => (
                            <div key={index} style={{ display: "table-cell", padding: "1rem", width: "33%" }}>
                            <img src={'https://source.unsplash.com/1600x900/?abstract.'+ item.post.node.articleid} alt={item.post.node.title} />
                            <Link to={`/links/${item.post.node.articleid}`}>
                                {item.post.node.title && <h3>{item.post.node.title}</h3>}
                            </Link>
                            <div>{item.post.node.excerpt}</div>
                        </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}

export default RelatedNews;
