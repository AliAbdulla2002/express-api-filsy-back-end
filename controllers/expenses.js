const express = require('express')

const Expense = require('../models/expense')


const create = async function (req, res) 
{
  try {

    req.body.owner = req.user._id

    const expense = await Expense.create(req.body)

    expense._doc.owner = req.user

    res.status(201).json(expense)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

const index = async function (req, res) 
{
  try {
    const expenses = await Expense.find({ owner: req.user._id }).populate('owner').sort({ createdAt: 'desc' })

    res.status(200).json(expenses)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

const update = async function (req, res) 
{
  try {
    const expense = await Expense.findById(req.params.expenseId)
    
    if (!expense.owner.equals(req.user._id)) 
    {
      return res.status(403).send("You're not allowed to do that!")
    }

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseId, req.body, { new: true })

    updatedExpense._doc.owner = req.user

    res.status(200).json(updatedExpense)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

const deleteExpense = async function (req, res) 
{
  try {

    const expense = await Expense.findById(req.params.expenseId)

    if (!expense.owner.equals(req.user._id)) 
    {
      return res.status(403).send("You're not allowed to do that!")
    }

    const deletedExpense = await Expense.findByIdAndDelete(req.params.expenseId)

    res.status(200).json(deletedExpense)

  } catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}


const show = async function (req, res) 
{
  try {
    const expense = await Expense.findById(req.params.expenseId).populate('owner')
    
    if (!expense) 
    {
      return res.status(404).json({ err: 'Expense not found' })
    }
    if (!expense.owner.equals(req.user._id)) 
    {
      return res.status(403).send("You're not allowed to do that!")
    }
    
    res.status(200).json(expense)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  create,
  index,
  update,
  deleteExpense,
  show,
}