const express = require('express');
const Company = require('../Models/businessSchema');
const { Loan } = require('../Models/loanSchema');


const loansRouter = express.Router();

//Returns all companies (including their loans)
loansRouter.get('/', async (req, res, next)=>{
  try{
    let companies = await Company.find({});
    res.status(200).json({message: "Companies successfully fetched", companies: companies})
  }
  catch (err) {next(err);}
})

//Adds a company and their loan
loansRouter.post('/', async (req, res, next) => {
  try{
      let {name, amount, type, otherType} = req.body;
      let loan = new Loan({amount: amount, type: type, otherType: otherType});
      let company = new Company({name: name, loans:[loan]});
      company.save();
      res.status(201).json({message: "Company successfully added"})
  }
  catch (err){next(err)}
});

//Removes Loan
loansRouter.delete('/:id', async (req, res, next)=>{
  try{
      Company.findByIdAndRemove(req.params.id, {useFindAndModify: false}, (err, user)=>{
        res.status(200).json({message: "Company successfully removed"})
        })
  }
  catch (err) {next(err)}
});


module.exports =  loansRouter;