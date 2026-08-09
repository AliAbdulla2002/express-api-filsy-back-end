const express = require('express')

const Event = require('../models/event.js')


const create = async function (req, res) 
{
  try {
    req.body.owner = req.user._id

    const event = await Event.create(req.body)

    event._doc.owner = req.user

    res.status(201).json(event)

  } 
  
  catch (err) 

  {
    res.status(500).json({ err: err.message })
  }
}



const index = async function (req, res) 
{
  try 
  {
    const events = await Event.find({ owner: req.user._id }).populate('owner').sort({ createdAt: 'desc' })

    res.status(200).json(events)

  } 
  
  catch (err)

  {
    res.status(500).json({ err: err.message })
  }
}



const update = async function (req, res) 
{
  try {

    const event = await Event.findById(req.params.eventId)

    if (!event.owner.equals(req.user._id))

    {
      return res.status(403).send("You're not allowed to do that!")
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId,req.body,{ new: true })

    updatedEvent._doc.owner = req.user

    res.status(200).json(updatedEvent)

  }
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

const deleteEvent = async function (req, res) 
{
  try {

    const event = await Event.findById(req.params.eventId)

    if (!event.owner.equals(req.user._id)) 

    {
      return res.status(403).send("You're not allowed to do that!")
    }

    const deletedEvent = await Event.findByIdAndDelete(req.params.eventId)

    res.status(200).json(deletedEvent)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}

const show = async function (req, res) 
{
  try {

    const event = await Event.findById(req.params.eventId).populate('owner')
    
    if (!event) {

      return res.status(404).json({ err: 'Event not found' })
    }
    
    if (!event.owner.equals(req.user._id)) {

      return res.status(403).send("You're not allowed to do that!")
    }
    
    res.status(200).json(event)

  } 
  catch (err) 
  {
    res.status(500).json({ err: err.message })
  }
}



module.exports = 
{
    create,
    index,
    update,
    deleteEvent,
    show,
}