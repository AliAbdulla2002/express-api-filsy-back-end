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

const index = async function (req, res) {
  try {
    const events = await Event.find({ owner: req.user._id }).populate('owner').sort({ createdAt: 'desc' })
    res.status(200).json(events)
  } catch (err)

  {
    res.status(500).json({ err: err.message })
  }
}


module.exports = 
{
    create,
    index,
}