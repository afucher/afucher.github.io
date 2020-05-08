import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArthurImage from './arthurImage'

const Container = styled.aside`
    padding-left: 5px;
`

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SocialContainer = styled.ul`
    list-style-type: none;
    margin: 0;
    margin-bottom: 20px;
`

const HorizontalRuler = styled.hr`
    height: 1px;
    background-color: #DDD;
    margin: 40px auto 10px auto;
    width: 80%;
`

const SocialItem = styled(props => <li {...props}>
            <a href={props.link} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={props.icon}/>
            </a>
        </li>)`
    display: inline;
    margin-right: 10px;
    a, a:visited, a:hover, a:active {
        color: black;
        text-decoration: none;
    }
`
const StyledImage = styled(props => <ArthurImage {...props}/>)`
    max-width: 150px;
    border-radius: 50%;
    margin-bottom: 5px;
`

const Tag = styled(props => <Link {...props}/>)`
    border: 1px solid black;
    padding: 0 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    text-decoration: none;
    color: black;
    font-size: 12px;
`

const Sidebar = () => {
    const data = useStaticQuery(graphql`
        query {
            post: allMarkdownRemark {
                group(field: frontmatter___tags) {
                    value: fieldValue
                    totalCount
                }
            }
        }
    `)

    return <Container> 
        <StyledImage />
        <h3>Arthur Fücher</h3>
        <p>e um texto que vou bolar sobre mim mesmo.</p>
        <HorizontalRuler />
        <h3>Me siga</h3>
        <SocialContainer>
            <SocialItem icon={["fab", "twitter"]} 
                        link="https://twitter.com/thur"/>
            <SocialItem icon={["fab", "twitch"]} 
                        link="https://twitch.tv/afucher"/>
            <SocialItem icon={["fab", "github"]} 
                        link="https://github.com/afucher"/>
        </SocialContainer>
        <HorizontalRuler />
        <h3>Tags</h3>
        <TagContainer>
            {data.post.group.map( tag => <Tag key={tag.value} to={`/tags/${tag.value}`}>{tag.value}</Tag>)}
        </TagContainer>
    </Container>
}


export default Sidebar;

