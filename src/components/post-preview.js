import React from 'react'
import { Link } from 'gatsby'
import styled from "@emotion/styled"
const padding = '20';
const Container = styled.article`
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

const TagLink = styled(props => <Link {...props}/>)`
    margin-right: 5px;
    color: black;
`

const PostPreview = ({date, title, slug, tags}) => {
    return (
        <Container>
            <StyledLink to={slug}>
                <h2>{title}</h2>
            </StyledLink>
            <FixedDate>Publicado em {date}</FixedDate>
            <FixedTags>Tags: {(tags || [])
                            .map(tag => <TagLink to={`/tags/${tag}`}>{tag}</TagLink>)}
            </FixedTags>
        </Container>
    )
}

export default PostPreview;