import React from 'react';
import styled from 'styled-components';
import ErrorMessage from './errorMessage';

export const StyledDiv = styled.div`
margin-bottom: 2rem;
width: 13rem;
display:flex;
flex-direction: column;
`

const InputAndError = ({label, id, onBlur, value, onChange, inputClicked, errorMessage, name}) => {
    return(
    <StyledDiv>
    <label htmlFor={id}>{label}</label>
    <input id={id} onBlur={onBlur} required value={value} name={name} onChange={onChange}/>
    {inputClicked && errorMessage!==true ? <ErrorMessage>{errorMessage}</ErrorMessage>:null}
    </StyledDiv>
    )
}; 

export default InputAndError;