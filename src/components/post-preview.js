import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from "@emotion/styled"
const padding = '20';
const Container = styled.article`
    width: 90%;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: black;
  text-decoration: none;
`;

const InfoContainer = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    list-style-type: none;
    margin: 0;
    li:first-child{
        text-align: left;
    }
    li:last-child{
        text-align: right;
    }
    li {
        font-size: 14px;
        font-style: italic; 
        margin: 0;
        text-align: center;
    }
    
`
const HorizontalRuler = styled.hr`
    height: 1px;
    background-color: #DDD;
    margin: 40px 100px 10px 100px;
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
            <InfoContainer>
                <li>Tags: {(tags || [])
                            .map(tag => <TagLink to={`/tags/${tag}`}>{tag}</TagLink>)}</li>
                <li>Tempo de leitura: {timeToRead} minutos</li>
                <li>Publicado em {date}</li>
                
            </InfoContainer>
            <HorizontalRuler />
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