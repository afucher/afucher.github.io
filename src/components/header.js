import { Link } from "gatsby"
import PropTypes from "prop-types"
import Search from "../components/search"
import React from "react"
import styled from '@emotion/styled'

const searchIndices = [
  { name: `Posts`, title: `Posts`, hitComp: `PostHit` },
]

const HeaderContent = styled.div`
  margin: 0px auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#DDD`,
      marginBottom: `1.45rem`,
    }}
  >
    <HeaderContent>
      <h1 style={{ margin: `0`, gridColumnStart: 2 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <Search collapse indices={searchIndices} />
    </HeaderContent>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
