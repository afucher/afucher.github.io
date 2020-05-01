import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'

const TagsPage = ({data}) => {
    const tags = data.post.group;

    return <Layout>
            <h1>Tags</h1>
            {tags.map(({value, totalCount}) => <ul>
                <li>
                    <Link to={`/tags/${value}`}>
                        {value} [{totalCount}]
                    </Link>
                </li>
            </ul> )}
        </Layout>
}

export const query = graphql`
    query {
        post: allMarkdownRemark {
            group(field: frontmatter___tags) {
                value: fieldValue
                totalCount
            }
        }
    }
`

export default TagsPage