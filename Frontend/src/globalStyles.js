import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

button, ul, li, input, div{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    :focus{outline: none;}
}


button{
    height: 3rem;
    color: white;
    border: 2px solid white;
    border-radius: 0.3rem;
    padding: 0.5rem;
    font-weight: bold;
    :hover{
        cursor: pointer;
    };
}
`

export default GlobalStyle;