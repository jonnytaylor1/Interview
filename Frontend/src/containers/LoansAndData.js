import React, { Component } from 'react';
import axios from 'axios';
import { loanTypeContext, companyLoanContext } from '../context';
import Company from '../components/company';
import LoanRequest from '../components/loanInfo';
import styled from 'styled-components';
import { frequencyAndTotal, loanBandCounter } from '../calculationFunctions';
import { loanTypes, initialChartConfig, bandCounter, bandGroups } from '../config';
import { isFieldValid } from '../formValidation';
import AllCharts from '../components/chart';
import AddLoanForm from '../components/addLoanForm';

const StyledOuterDiv = styled.div`
display: flex;
`

const BusinessesContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 600px;
margin-top: 5rem;
`

const StyledUl = styled.ul`
display: flex;
width: 500px;
flex-direction: column;
overflow-y: scroll;
height: 37rem;
`

export const StyledButton = styled.button`
background: ${props=>{
    if(props.active==="isactive") return "blue";
    else return props.background
}};
:disabled {
    background: grey;
    cursor: not-allowed;
}
`

export const ChartButton = styled(StyledButton)`
width: calc(100%/3);
`


const StyledInnerDiv = styled.div`
display: flex;
align-self: flex-end;
margin: 5rem 5rem 0 5rem;
gap: 5rem;
height: calc(100vh - 7rem);
`


class LoansAndData extends Component {
    static contextType = companyLoanContext

    componentDidMount (){this.getCompanies();}

    constructor(props) {
        super(props);
        this.initialFormData = {name: "", amount: "", type: "DEFAULT", otherType: ""};
        this.intitialInputValidation = {name: false, amount: false, type: false, otherType: true};

        this.state = {
            chartConfig: initialChartConfig,
            companies: [],
            calculationsData: {},
            activeGraph: "Average",
            loanData: this.initialFormData,
            inputValidated: this.intitialInputValidation,
            inputClicked: {name: false, amount: false, type: false, otherType: false}
        }
    
    }
    //Retrieves the companies, forms the data, creates the graphs
    getCompanies = ()=>{
        axios.get('http://localhost:5000/loans')
        .then(response => {
            //Creates the averages and total of each loan type data
            let frequencyAndTotalData = frequencyAndTotal(loanTypes, response.data.companies);
            let dataTypes = Object.keys(frequencyAndTotalData);
            let frequencyAndTotals = Object.values(frequencyAndTotalData);
            let averages = frequencyAndTotals.map(data=> data.frequency !== 0 ? Math.round(data.totalAmount/data.frequency).toString() : 0);
            let typeFrequencies = frequencyAndTotals.map(data=>data.frequency);
            //Creates the loan band data
            let bandCounterObject = loanBandCounter(response.data.companies, bandCounter);
            let bandFrequencies = Object.values(bandCounterObject);
            //Updates the company state
            this.setState({...this.state, 
                companies: response.data.companies.reverse(),
                calculationsData: {averages: averages, frequencies: typeFrequencies, bandFrequencies: bandFrequencies}
            })
            //Updates the graph data
            let graphName = this.state.chartConfig.series[0].name;
            if(graphName==="Averages"||graphName==="") this.setState({...this.state, chartConfig: {...this.state.chartConfig, options: {...this.state.chartConfig.options, xaxis: {...this.state.chartConfig.options.xaxis, categories: dataTypes}}, series: [{name:"Averages", data: averages}]}});
            else if (graphName==="Frequency (Type)")  this.setState({...this.state, chartConfig: {...this.state.chartConfig, options: {...this.state.chartConfig.options, xaxis: {...this.state.chartConfig.options.xaxis, categories: dataTypes}}, series: [{name:"Frequency (Type)", data: typeFrequencies}]}});
            else if (graphName==="Frequency (Band)") this.setState({...this.state, chartConfig: {...this.state.chartConfig, options: {...this.state.chartConfig.options, xaxis: {...this.state.chartConfig.options.xaxis, categories: bandGroups}}, series: [{name:"Frequency (Band)", data: bandFrequencies}]}});
})
.catch(err=>console.log(err));}
   
    //Adds a loan and updates the companies
    addLoan = async (e)=>{
        e.preventDefault();
        try{
        await axios.post('http://localhost:5000/loans', this.state.loanData);
        this.setState({...this.state, 
            loanData: this.initialFormData, 
            inputValidated: this.intitialInputValidation
        });
        this.getCompanies();  
        }
        catch(err){
            console.log(err);
        }      
    }

    //updates the state with the dropdown information
    dropDownChangeHandler = (e)=>{
        let {value} = e.target;
        if(value==="Other"){
            this.setState({...this.state, 
                loanData: {...this.state.loanData, type: value},
                inputValidated: {...this.state.inputValidated, otherType: false}});
        }
        else{
            this.setState({...this.state, 
                loanData: {...this.state.loanData, type: value, otherType: ""},
                inputValidated: {...this.state.inputValidated, otherType: true}});
        }
    }

    //updates the state on input change
    onChangeHandler = (e)=>{
        let {name, value} = e.target;
        this.setState({...this.state, loanData: {...this.state.loanData, [name]: value}});
    }

    //Updates the state on blur and handles errors
    onBlurHandler = (e)=>{
        let {name, value} = e.target;
        let validator = isFieldValid(name, value);

        this.setState({...this.state, 
            inputClicked: {...this.state.inputClicked, [name]: true},
            inputValidated: {...this.state.inputValidated, [name]: validator}
        })
    }

   //Removes a company and it's existing loans
    deleteCompany = async (e, companyId)=>{
        e.stopPropagation();
        try{
        await axios.delete('http://localhost:5000/loans/' + companyId);
           //If more time I would use this to update the array instead of calling from the database
        // let updatedCompanies = [...this.state.companies].filter(company=>company._id!==companyId);
        // this.setState({...this.state, companies: updatedCompanies});
        this.getCompanies();
        }
        catch (err){
            console.log(err);
        }
    }

  //Changes the graph type and updates the graph data
    changeGraph=(e)=>{
        let name;
        let data;
        let categories;
        let activeGraph;
        switch (e.target.name){
            case "average":
                name = "Averages";
                data = this.state.calculationsData.averages;
                categories = loanTypes;
                activeGraph = "Average"
                break;
            case "frequencyType":
                name = "Frequency (Type)";
                data = this.state.calculationsData.frequencies;
                categories = loanTypes;
                activeGraph = "Frequency (Type)"
                break;
            
            case "frequencyBands":
                name = "Frequency (Band)";
                data = this.state.calculationsData.bandFrequencies;
                categories = bandGroups;
                activeGraph = "Frequency (Band)"
                break;
            default:
                console.log("error");     
            }
            this.setState({...this.state, 
                chartConfig: {...this.state.chartConfig, options:{...this.state.chartConfig.options, xaxis: {...this.state.chartConfig.options.xaxis, categories: categories}}, series: [{name: name, data: data}]},
                activeGraph: activeGraph});
            }
       
    render(){

       const { companyLoanDetails, setCompanyLoanDetails } = this.context;
    
        const showLoanDetails = (e, companyId)=>{
        let clickedCompany = this.state.companies.find(company=> company._id===companyId);
        setCompanyLoanDetails(clickedCompany);
        this.props.history.push('/details');
    }

        let companiesUI;
        if(this.state.companies.length!==0){
            companiesUI = this.state.companies.map(company=>{
                return <Company showLoanDetails={(e)=>showLoanDetails(e, company._id)} key={company._id} name = {company.name} deleteCompany={(e)=>this.deleteCompany(e, company._id)}>
                    {company.loans.map((loan)=> <LoanRequest otherType={loan.otherType} amount={loan.amount} type={loan.type}/>)}
                </Company>
            })
        }

    return(
        <StyledOuterDiv>
        <BusinessesContainer>
                <h1>Businesses</h1>
                {companiesUI ? 
                    <> 
                        <p>Click Business to Show Further Details</p>
                        <StyledUl>{companiesUI}</StyledUl>
                    </>
                :   <p>Currently no businesses</p>}
        </BusinessesContainer>
        <StyledInnerDiv>
    
            <AllCharts  series={this.state.chartConfig.series} options={this.state.chartConfig.options} activeGraph={this.state.activeGraph} onChange={(e)=>this.changeGraph(e)}/>
            <AddLoanForm loanData={this.state.loanData} inputClicked={this.state.inputClicked} inputValidated={this.state.inputValidated} dropdownChange={(e)=>this.dropDownChangeHandler(e)} onBlur={(e)=>this.onBlurHandler(e)} onChange={(e)=>this.onChangeHandler(e)} onSubmit={(e)=>this.addLoan(e)}/> 
        </StyledInnerDiv>
        </StyledOuterDiv>
    )
}; 
}

export default LoansAndData;