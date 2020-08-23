import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.p`
position: absolute;
font-size: 0.9rem; 
color: red; 
margin-top: 2.5rem;
`

const ErrorMessage = ({children}) => <StyledMessage>{children}</StyledMessage>

export default ErrorMessage;