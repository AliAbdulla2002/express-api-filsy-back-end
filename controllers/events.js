const express = require('express')
const Event = require('../models/event.js')

const create = async function (req, res) {
  try {
    req.body.owner = req.user._id
    const event = await Event.create(req.body)
    event._doc.owner = req.user
    res.status(201).json(event)
  } catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}


module.exports = 
{
    create,
}