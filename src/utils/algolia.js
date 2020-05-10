  const postQuery = `{
    posts: allMarkdownRemark{
      edges {
        node {
          objectID: id
          frontmatter {
            title
            slug
            date(formatString: "MMM D, YYYY")
            tags
          }
          excerpt(pruneLength: 500)
        }
      }
    }
  }`
  
  const flatten = arr =>
    arr.map(({ node: { frontmatter, ...rest } }) => ({
      ...frontmatter,
      ...rest,
    }))
  const settings = { attributesToSnippet: [`excerpt:20`] }
  
  const queries = [
    {
      query: postQuery,
      transformer: ({ data }) => flatten(data.posts.edges),
      indexName: `Posts`,
      settings,
    },
  ]
  
  module.exports = queries