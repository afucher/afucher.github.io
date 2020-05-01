import React from "react"
import { graphql } from "gatsby"
import PostPreview from '../components/post-preview'
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PostPreviewContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const IndexPage = ({data}) => {
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Aloha!</h1>
      <p>Esse é o meu super blog! Que tem {data.allMarkdownRemark.totalCount} posts.</p>
      <PostPreviewContainer>
        {posts.map(({node}) => <PostPreview {...node.frontmatter}/>)}
      </PostPreviewContainer>

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
            slug
            tags
          }
        }
      }
      totalCount
    }
  }
`

export default IndexPage
