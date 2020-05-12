import React, { useState, useEffect, createRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import styled from '@emotion/styled'

import Input from "./input"
import * as hitComps from "./hitComps"
const HitsWrapper = styled.div`
    display:  ${props => (props.show ? `grid` : `none`)};
    position: absolute;
    right: 0;
    top: calc(100% + 0.5em);
    width: 80vw;
    max-width: 30em;
    box-shadow: 0 0 5px 0;
    padding: 0.7em 1em 0.4em;
    max-height: 80vh;
    overflow: scroll;
    z-index: 2;
    -webkit-overflow-scrolling: touch;
    background: white;
    > * + * {
        padding-top: 1em !important;
        
        }
        li + li {
        margin-top: 0.7em;
        padding-top: 0.7em;
        
        }
        * {
        margin-top: 0;
        padding: 0;
        }
        ul {
        list-style: none;
        }
        mark {
        color: lightblue;
        background: darkblue;
        }
        header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3em;
        h3 {
            color: white;
            background: gray;
            padding: 0.1em 0.4em;
            border-radius: 3px;
        }
        }
        h3 {
        margin: 0 0 0.5em;
        }
        h4 {
        margin-bottom: 0.3em;
        }
`
const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
  width: min-content;
`

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `Sem resultados para '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} resultado${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))
  return (
    <Root ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <h3>{title}</h3>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <p>Powered by <FontAwesomeIcon icon={["fab", "algolia"]}/></p>
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}