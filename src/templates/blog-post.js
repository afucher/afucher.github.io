import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import styled from "@emotion/styled"
import Img from "gatsby-image"

const FeaturedImg = styled(props => <Img {...props} />)`
  max-width: 800px;
  height: 300px;
`;

export default ({data}) => {
    let featuredImgFluid = data.markdownRemark.frontmatter.featuredImage?.childImageSharp.fluid;
    return <Layout>
        <SEO  title={data.markdownRemark.frontmatter.title}
              article={true}
              image={featuredImgFluid?.src}/>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        {featuredImgFluid && <FeaturedImg fluid={featuredImgFluid} /> }
        <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}></div>
    </Layout>
}
 
export const query = graphql` 
    query($slug: String) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            frontmatter {
                title
                featuredImage {
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            src
                        }
                    }
                }
            }
            html
        }
    }
`