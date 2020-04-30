import React from 'react'
import { Link } from 'gatsby'
import styled from "@emotion/styled"
const padding = '20px';
const Container = styled.div`
    border: 1px solid #DDD;
    border-radius: 5px;
    padding: ${padding};
    margin-bottom: 20px;
    position: relative;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: black;
  text-decoration: none;
`;

const FixedDate = styled.span`
    position: absolute;
    right: ${padding};
    bottom: ${padding};
    font-size: 14px;
`

const PostPreview = ({date, title, slug}) => {
    return (
        <Container>
            <StyledLink to={slug}>
                <h2>{title}</h2>
                <FixedDate>{date}</FixedDate>
                <p>Ler...</p>
            </StyledLink>
        </Container>
    )
}

export default PostPreview;