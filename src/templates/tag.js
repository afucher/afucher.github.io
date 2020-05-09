import React from 'react'
import Layout from '../components/layout'
import PostPreview from '../components/post-preview'
import Pagination from '../components/pagination'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

const Tag = ({ pageContext, data }) => {
    const posts = data.allMarkdownRemark.edges;
    const { numPages, currentPage } = pageContext;
    return <Layout>
        <SEO title={`Tag: ${pageContext.tag}`} />
        <h1>{pageContext.tag} [{data.allMarkdownRemark.totalCount}]</h1>
        {posts.map(({ post }) => <PostPreview {...post.frontmatter} excerpt={post.excerpt} timeToRead={post.timeToRead}/>)}
        <Pagination numPages={numPages} currentPage={currentPage} prefix={`tags/${pageContext.tag}`}/>
    </Layout>
}

export default Tag

export const pageQuery = graphql`
  query($tag: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: { frontmatter: { tags: { in: [$tag] } } },
      limit: $limit,
      skip: $skip
    ) {
      totalCount
      edges {
        ...PreviewPostInformation
      }
    }
  }
`