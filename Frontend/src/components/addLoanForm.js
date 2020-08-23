import React from 'react';
import styled from 'styled-components';
import InputAndError from './inputAndError';
import { isFormValid } from '../formValidation';
import {StyledButton} from '../containers/LoansAndData';
import { loanTypes } from '../config';
import SelectAndError from './selectAndError';


const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-self: flex-end;
border: 1px solid black;
padding: 1rem;
`

const AddLoanForm = ({inputValidated, inputClicked, loanData, onSubmit, dropdownChange, onChange, onBlur})=> {
    

    const optionElements = [<option key="-1" value="DEFAULT" disabled>Loan Type</option>, loanTypes.map((loanType, index)=><option key={index} value={loanType}>{loanType}</option>)];

        return(
            <>
            <StyledForm onSubmit={onSubmit}>
                <InputAndError id="nameInput" label="Name" name="name" value={loanData.name} onChange={onChange} onBlur={onBlur} errorMessage={inputValidated.name} inputClicked={inputClicked.name}/>
                <InputAndError id="amountInput" label="Amount(£)" name="amount" value={loanData.amount} onChange={onChange} onBlur={onBlur} errorMessage={inputValidated.amount} inputClicked={inputClicked.amount}/>
                <SelectAndError id="loanType" label="Type" onBlur={onBlur} name="type" value={loanData.type} onChange={dropdownChange} errorMessage={inputValidated.type} inputClicked={inputClicked.type} inputValidated={inputValidated.type}>
                    {optionElements}
                </SelectAndError>
                {loanData.type==="Other" ? 
                <InputAndError id="otherType" label="Other Type" name="otherType" value={loanData.otherType} onChange={onChange} onBlur={onBlur} errorMessage={inputValidated.otherType} inputClicked={inputClicked.otherType} inputValidated={inputValidated.otherType}/>
                : null}
                <StyledButton background="green" disabled={!isFormValid(inputValidated)}>Add Loan Request</StyledButton>
        </StyledForm>
        </>
        )
    } 

export default AddLoanForm;