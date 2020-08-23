const mongoose = require('mongoose');
const {LoanSchema} = require('./loanSchema');

//This design allows there to be many loans added to the same company
const CompanySchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        loans: [LoanSchema]
    }
)
  
  const Company = mongoose.model('Company', CompanySchema);
  module.exports = Company;