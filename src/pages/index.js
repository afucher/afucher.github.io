import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Aloha!</h1>
    <p>Esse é o meu super blog! Que tem {data.allMarkdownRemark.totalCount} posts.</p>
    <ul>
      {data.allMarkdownRemark
            .edges
            .map(edge => <li>{`${edge.node.frontmatter.title} - ${edge.node.frontmatter.date}`}</li>)}
    </ul>

  </Layout>
)

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
          }
        }
      }
      totalCount
    }
  }
`

export default IndexPage
