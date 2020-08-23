//Creates an object containing the frequency and total of each data type
//{"type": {"frequency":_, "totalAmount":_}}

export const frequencyAndTotal= (loanTypes, businesses)=>{
  let dataObject = {};
  
  //Creates an intitial object starting each loan type with a frequency and totalAmount of 0
  loanTypes.forEach(loanType=>{
    dataObject[loanType] = {frequency: 0, totalAmount: 0}
  })

  //Iterates through each business and adds to the frequency and totalAmount(Money) of each type
    businesses.forEach(business => {
        business.loans.forEach(loan=>{
          console.log(dataObject[loan.type]);
          dataObject[loan.type].frequency = dataObject[loan.type].frequency + 1;
          dataObject[loan.type].totalAmount = dataObject[loan.type].totalAmount + loan.amount;
        })
      })
      return dataObject;
}
 
//Counts the number of loans in each money band
export const loanBandCounter = (companies, bandCounter)=>{
    let bands = Object.keys(bandCounter);
    let updatedCounter = {...bandCounter};
    companies.forEach(company=>{
      company.loans.forEach(loan=>{
          for(let i=bands.length-1; i>=0; i--){
              if(loan.amount >= bands[i]) {
                  updatedCounter[bands[i]] += 1;
                  return;
          }
        }
    })
})
return updatedCounter}



