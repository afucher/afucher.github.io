import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Aloha!</h1>
      <p>Esse é o meu super blog! Que tem {data.allMarkdownRemark.totalCount} posts.</p>
      <ul>
        {posts.map(({node}) => <li>
                                <Link to={node.fields.slug}>
                                  {`${node.frontmatter.title} - ${node.frontmatter.date}`}
                                </Link>
                              </li>)}
      </ul>

    </Layout>
)}

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`

export default IndexPage
