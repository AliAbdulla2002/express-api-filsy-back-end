const express = require('express')
const Expense = require('../models/expense')

const create = async function (req, res) 
{
  try {
    req.body.owner = req.user._id
    const expense = await Expense.create(req.body)
    expense._doc.owner = req.user
    res.status(201).json(expense)
  } catch (err) 
  
  {
    res.status(500).json({ err: err.message })
  }
}

const index = async function (req, res) {
  try {
    const expenses = await Expense.find({ owner: req.user._id }).populate('owner').sort({ createdAt: 'desc' })
    res.status(200).json(expenses)
  } catch (err) 

  {
    res.status(500).json({ err: err.message })
  }
}


module.exports = {
  create,
  index,
}