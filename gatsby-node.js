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
            posts: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

    // Cria paginas dos posts com paginação
    const posts = result.data.posts.edges
    const postsPerPage = 3
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve("./src/templates/blog-list.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    //Cria os posts
    result.data.posts.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
                slug: node.frontmatter.slug
            }
        })
    })

    //Cria página de tags
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
