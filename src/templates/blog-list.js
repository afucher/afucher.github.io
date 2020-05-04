import React from 'react'
import { graphql } from 'gatsby'
import styled from "@emotion/styled"
import Layout from '../components/layout'
import PostPreview from '../components/post-preview'
import Pagination from '../components/pagination'

const PostPreviewContainer = styled.div`
  display: flex;
  flex-flow: column;
`


const BlogList = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges;
    const { numPages, currentPage } = pageContext;
    
    return (      
    <Layout>
        <PostPreviewContainer>
            {posts.map(({post}) => <PostPreview {...post.frontmatter} excerpt={post.excerpt} timeToRead={post.timeToRead}/>)}
        </PostPreviewContainer>
        <Pagination numPages={numPages} currentPage={currentPage}/>

    </Layout>)
}

export default BlogList

export const query = graphql`
    query BlogListQuery($skip: Int!, $limit: Int!) {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC},
        limit: $limit,
        skip: $skip) {
            edges {
                ...PreviewPostInformation
            }
            totalCount
        }
    }
`