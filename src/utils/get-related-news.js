// @flow strict
import { includes, orderBy, filter } from 'lodash'


export const getRelatedNews = (currentId, currentTags, allNews) => {

    const maxPosts = 3;

    // Don't include the current post in posts list
    allNews = allNews.filter((post) => post.node.id !== currentId);

    const identityMap = {};

    //Map over all posts, add to map and add points
    for (let post of allNews) {
        const id = post.node.id;
        if (!identityMap.hasOwnProperty(id)) {
            identityMap[id] = {
                post: post,
                points: 0
            }
        }

        // For tags matches, we add 1 point
        let alltags = (post.node.extractedkeywords + "," + post.node.tags).split(",")
        //filter out null, and all tags beginning with *
        alltags = filter(alltags, tag => tag!="null" && !tag.startsWith("*"))
        const tagPoint = 1;
        alltags.forEach((aTag) => {
            if (includes(currentTags, aTag)) {
                identityMap[id].points += tagPoint;
            }
        })

    }

    // Convert the identity map to an array
    const arrayIdentityMap = Object.keys(identityMap).map((id) => identityMap[id]);

    // Use a lodash utility function to sort them 
    // by points, from greatest to least
    const similarNews = orderBy(
        arrayIdentityMap, ['points'], ['desc']
    )

    //console.log(similarNews.splice(0, maxPosts))
    // return the max number posts requested
    return similarNews.splice(0, maxPosts);
  
};

export default getRelatedNews;
