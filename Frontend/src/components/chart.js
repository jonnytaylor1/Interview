import React from 'react';
import styled from 'styled-components';
import {ChartButton} from '../containers/LoansAndData';
import Chart from "react-apexcharts";

const StyledChart = styled(Chart)`
border: solid black 1px;
padding: 1rem;
`

const StyledChartDiv = styled.div`
align-self: flex-end;
`

const AllCharts = ({activeGraph, onChange, options, series}) => {
    return(
        <StyledChartDiv>
        <div>
            <ChartButton active={activeGraph === "Average" ? "isactive" : " "} name="average" onClick={onChange}>Average of Each Loan Type</ChartButton>  
            <ChartButton active={activeGraph === "Frequency (Type)" ? "isactive" : " "} name="frequencyType" onClick={onChange}>Frequency of Each Loan Type</ChartButton>
            <ChartButton active={activeGraph === "Frequency (Band)" ? "isactive" : " "} name="frequencyBands" onClick={onChange}>Frequency of Loans in Each Band</ChartButton>
        </div>
        <div>
      <StyledChart
        options={options}
        series={series}
        type="bar"
        height="515px"
        width= "775px"
      />
      </div>
    </StyledChartDiv>
    )
}; 

export default AllCharts;