/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 const path = require('path')
 
exports.createPages = async({ graphql, actions}) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
            posts: allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark(limit: 2000) {
                tags: group(field: frontmatter___tags) {
                  value: fieldValue
                }
              }
        }
    `);

    result.data.posts.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
                slug: node.frontmatter.slug
            }
        })
    })

    result.data.tagsGroup.tags.forEach( ({value}) => {
        createPage({
            path: `/tags/${value}/`,
            component: path.resolve('./src/templates/tag.js'),
            context: {
                tag: value
            }
        })
    })
}
