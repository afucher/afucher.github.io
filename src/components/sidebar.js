import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery, Link } from 'gatsby'

const Container = styled.aside`
    padding-left: 5px;
`

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
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
        <h3>Sobre mim</h3>
        <p>Arthur Fücher, e um texto que vou bolar sobre mim mesmo.</p>
        <h3>Me siga</h3>
        <p>Links para me seguir ficam aqui</p>
        <h3>Tags</h3>
        <TagContainer>
            {data.post.group.map( tag => <Tag to={`/tags/${tag.value}`}>{tag.value}</Tag>)}
        </TagContainer>
    </Container>
}


export default Sidebar;

