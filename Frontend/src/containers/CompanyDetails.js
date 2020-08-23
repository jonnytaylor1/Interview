import React, { useContext } from 'react';
import {companyLoanContext} from '../context';
import LoanRequest from '../components/loanInfo';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {StyledButton} from './LoansAndData';

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid black;
width: 40rem;
margin: 5rem auto;
`

const StyledUl = styled.ul`
margin: 1rem 0 3rem 0;
`

const BackButton = styled(StyledButton)`
position: absolute;
top: 1rem;
left: 1rem;
`


const CompanyDetails = (props) => {
    const {companyLoanDetails, setCompanyLoanDetails} = useContext(companyLoanContext);
    let {name, loans} = companyLoanDetails;
    let loansUI = loans.map((loan)=><LoanRequest key={loan._id} amount={loan.amount} type={loan.type} otherType={loan.otherType}/>)

    const history= useHistory();

    return(
        <>
        <BackButton background="#5d5d5d" onClick={()=>history.goBack()}>Back</BackButton>
        <StyledDiv>
        <h1>{name}'s Loan Requests</h1>
        <StyledUl>
        {loansUI}
        </StyledUl>
        </StyledDiv>
     
        </>
    ) 
}; 

export default CompanyDetails;