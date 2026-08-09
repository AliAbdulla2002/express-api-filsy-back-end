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

module.exports = {
  create,
}