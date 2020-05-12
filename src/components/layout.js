/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Sidebar from "./sidebar"
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { fas, faHourglassStart, faCalendarAlt,  faSearch} from '@fortawesome/free-solid-svg-icons'
import { fab, faTwitch, faTwitter, faGithub, faAlgolia } from '@fortawesome/free-brands-svg-icons'
import "./layout.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import styled from "@emotion/styled"

config.autoAddCss = false
library.add( fab, fas, faTwitch, faTwitter, faGithub, faHourglassStart, faCalendarAlt, faSearch, faAlgolia)

const ContainerSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 25%;
  }
  grid-gap: 10px;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <ContainerSection>
          <main>{children}</main>
          <Sidebar />
        </ContainerSection>
        <footer style={{
          marginTop: `20px`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
