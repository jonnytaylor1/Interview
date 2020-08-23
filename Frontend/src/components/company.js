import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: solid lightgrey 2px;
margin-bottom: 1rem;
:hover{
    cursor:pointer;
    border-color: green;
    };
`
const StyledBtn = styled.button`
background: ${props=>props.background};
margin: 1rem;
:hover{border-color: ${props=>props.border};};
`


const Company = ({name, showLoanDetails, deleteCompany, children}) => {
    return(
        <StyledDiv onClick={showLoanDetails}>
        <strong><p>{name}'s Loan Requests</p></strong>
        {children}
        <StyledBtn border="darkred" background="red" onClick={deleteCompany}>Remove Company</StyledBtn>
        </StyledDiv>
    )
}; 

export default Company;
