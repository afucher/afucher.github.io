import React from 'react'
import Layout from '../components/layout'
import PostPreview from '../components/post-preview'
import { graphql } from 'gatsby'

const Tag = ({ pageContext, data }) => {
    const posts = data.allMarkdownRemark.edges;
    return <Layout>
        <h1>{pageContext.tag} [{data.allMarkdownRemark.totalCount}]</h1>
        {posts.map(({ post }) => <PostPreview {...post.frontmatter} excerpt={post.excerpt} timeToRead={post.timeToRead}/>)}
    </Layout>
}

export default Tag

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        ...PreviewPostInformation
      }
    }
  }
`