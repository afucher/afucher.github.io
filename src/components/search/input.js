import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import styled from '@emotion/styled'

const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
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
  </Form>
))