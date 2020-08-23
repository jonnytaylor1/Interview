import React from 'react';
import ErrorMessage from './errorMessage';
import {StyledDiv} from './inputAndError';
const SelectAndError = ({name, label, value, onChange, onBlur, inputClicked, inputValidated, errorMessage, children}) => {
    return(
        <StyledDiv>
        <label htmlFor={name}>{label}</label>
        <select id={name} onBlur={onBlur} required name={name} value={value} onChange={onChange}>
        {children}
        </select>
        {inputClicked && inputValidated!==true ? <ErrorMessage>{errorMessage}</ErrorMessage>:null} 
        </StyledDiv>
    ) 
}; 

export default SelectAndError;