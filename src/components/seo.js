/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, title, image, article }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl: url
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const ogImage = image ? `${site.siteMetadata.siteUrl}${image}` : '';
  return (
    <Helmet
      htmlAttributes={{
        lang: 'pt-br',
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]}
    />
  )
}

SEO.defaultProps = {
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO
