import React from 'react'
import { Link, graphql } from 'gatsby'
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

const PostPreview = ({date, title, slug, tags, excerpt, timeToRead}) => {
    return (
        <Container>
            <StyledLink to={slug}>
                <h2>{title}</h2>
                <p>{excerpt}</p>
            </StyledLink>
            <p>{timeToRead} minutos</p>
            <FixedDate>Publicado em {date}</FixedDate>
            <FixedTags>Tags: {(tags || [])
                            .map(tag => <TagLink to={`/tags/${tag}`}>{tag}</TagLink>)}
            </FixedTags>
        </Container>
    )
}

export const query = graphql`
    fragment PreviewPostInformation on MarkdownRemarkEdge {
        post: node {
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            slug
            tags
          }
          excerpt(pruneLength: 140)
          timeToRead
        }
    }
`

export default PostPreview;