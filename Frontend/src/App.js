import React, { useState } from 'react';
import './App.css';
import GlobalStyle from './globalStyles';
import {companyLoanContext } from './context';
import LoansAndData from './containers/LoansAndData';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import CompanyDetails from './containers/CompanyDetails';
import { ProtectedRoute } from './hoc/routes';



function App() {
  const [companyLoanDetails, setCompanyLoanDetails] = useState(null);

  return (
    <>
    <GlobalStyle />
    <div className="App">      
    <companyLoanContext.Provider value={{companyLoanDetails, setCompanyLoanDetails}}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoansAndData}/>
            <ProtectedRoute path="/details" details={companyLoanDetails}  exact component={CompanyDetails}/>
          </Switch>
        </BrowserRouter>
      </companyLoanContext.Provider>
    </div>
    </>
  );
}

export default App;
