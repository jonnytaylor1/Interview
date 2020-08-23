import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: solid black 1px;
width: 25rem;
border-radius: 1rem;
margin: 1rem;
`


const LoanRequest = ({otherType, amount, type}) => {
  
    return(
        <StyledDiv>
            <p>£{amount}</p>
            <p>Type: {type}</p>
            {otherType ? 
            <p>Other Type: {otherType}</p>
            :null}
            
        </StyledDiv>
    )
}; 

export default LoanRequest;