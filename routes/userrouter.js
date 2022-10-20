const express = require('express')
const router = express.Router()
const usermodel = require('../models/usermodel')

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await usermodel.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.usermodel)
})

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new usermodel({
    name: req.body.name,
    age: req.body.age
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.usermodel.name = req.body.name
  }
  if (req.body.age != null) {
    res.usermodel.age = req.body.age
  }
  try {
    const updatedSubscriber = await res.usermodel.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.usermodel.remove()
    res.json({ message: 'Deleted usermodel' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await usermodel.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = usermodel
  next()
}

module.exports = router