export const loanTypes = ["Buy another business", "Export overseas","Acquire a new piece of equipment","Buy a property and to rent it out","Acquire a new vehicle for my business","Recruit new staff", "Other"];
export const initialChartConfig = {
    options: {
      chart: {
        id: "basic-bar"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [],
        labels: {
          maxHeight: undefined
        }
      },
      plotOptions: {
        bar: {
            distributed: true
        }
      },
      legend: {
        show: false
      }
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
}

export const bandCounter = {15000: 0, 25000: 0, 50000: 0, 100000: 0, 250000: 0, 500000: 0, 750000: 0, 1000000: 0, 2000000: 0};

//converts the object above to an array of strings, each string is a band group
const convertBandLowersToGroups =(minValuesInBands)=>{
  let groups = []
  for(let i=0; i<minValuesInBands.length; i++){
      if(minValuesInBands[i+1]===undefined) groups.push(minValuesInBands[i] + "+"); 
      else groups.push("£" + minValuesInBands[i] + "-" + (parseInt(minValuesInBands[i+1])-1).toString());
  }
  return groups;
}

export let bandGroups = convertBandLowersToGroups(Object.keys(bandCounter));


