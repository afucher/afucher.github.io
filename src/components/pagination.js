import React from 'react'
import { Link } from 'gatsby'
import styled from "@emotion/styled"

const PaginationContainer = styled.nav`
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > a {
        color:black;
        text-decoration:none;
    }
    
    & > .next {
        grid-column-start: 2;
        place-self: end;       
    }
`

const Pagination = ({ currentPage, numPages, prefix=''}) => {
    const isLastPage = currentPage === numPages;
    const isFirstPage = currentPage === 1;
    const previousPageTo = prefix + (currentPage === 2 ? `/` : `/${currentPage - 1}`);

    return (
        <PaginationContainer>
            {!isLastPage && <Link to={`${prefix}/${currentPage + 1}`}>← Mais antigos</Link>}
            {!isFirstPage && <Link to={previousPageTo}  className={"next"}>Mais novos→</Link>}
        </PaginationContainer>
    )
}


export default Pagination;