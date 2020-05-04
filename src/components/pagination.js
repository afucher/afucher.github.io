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

const Pagination = ({ currentPage, numPages}) => {
    const isLastPage = currentPage === numPages;
    const isFirstPage = currentPage === 1;
    const previousPageTo = currentPage === 2 ? `/` : `/${currentPage - 1}`;

    return (
        <PaginationContainer>
            {!isFirstPage && <Link to={previousPageTo}>←Página anterior</Link>}
            {!isLastPage && <Link to={`/${currentPage + 1}`} className={"next"}>Próxima página→</Link>}
        </PaginationContainer>
    )
}


export default Pagination;