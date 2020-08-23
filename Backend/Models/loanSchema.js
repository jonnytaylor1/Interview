const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema(
    {
        amount: {type: Number, required:true},
        type: {type: String, required:true},
        otherType: {type: String, required: false}
    }
)

module.exports.LoanSchema = LoanSchema;
module.exports.Loan = mongoose.model('Loan', LoanSchema);