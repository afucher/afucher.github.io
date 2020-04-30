import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

export default ({data}) => {
    return <Layout>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></div>
    </Layout>
}
 
export const query = graphql` 
    query($slug: String) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            frontmatter {
                title
            }
            html
        }
    }
`