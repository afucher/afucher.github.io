import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'

const Form = styled.form`
  display: flex;
  margin: 0;
  border: 1px solid #f2f2f2;
  align-items: center;
  padding: 3px;
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
`

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
    <FontAwesomeIcon icon={["fa", "search"]} />
  </Form>
))