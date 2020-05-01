import React from 'react'
import { Link } from 'gatsby'
import styled from "@emotion/styled"
const padding = '20';
const Container = styled.div`
    border: 1px solid #DDD;
    border-radius: 5px;
    padding: ${padding}px;
    margin-bottom: 20px;
    position: relative;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: black;
  text-decoration: none;
`;

const FixedDate = styled.span`
    position: absolute;
    right: ${padding}px;
    bottom: ${padding/2}px;
    font-size: 14px;
    font-style: italic;
`

const FixedTags = styled.span`
    position: absolute;
    left: ${padding}px;
    bottom: ${padding/2}px;
    font-size: 14px;
    font-style: italic;
`

const PostPreview = ({date, title, slug, tags}) => {
    return (
        <Container>
            <StyledLink to={slug}>
                <h2>{title}</h2>
                <FixedDate>Publicado em {date}</FixedDate>
                <FixedTags>{(tags || []).join(', ')}</FixedTags>
                <p>Ler...</p>
            </StyledLink>
        </Container>
    )
}

export default PostPreview;