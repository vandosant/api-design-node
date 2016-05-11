// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server
let tigerRouter = require('express').Router()
const _ = require('lodash')
let tigers = []
let id = 0
tigerRouter.param('id', function(req, res, next, paramId) {
  let tiger = _.find(tigers, {id: paramId})
  if (tiger) {
    req.tiger = tiger
    next()
  } else {
    res.status(404).send('Tiger not found')
  }
});

tigerRouter.route('/')
.get(function(req, res) {
  res.json(tigers)
})
.post(function(req, res) {
  let tiger = Object.assign(req.body, {id: id.toString()})
  tigers.push(tiger)
  id++
  res.json(tiger)
});

tigerRouter.route('/:id')
.get(function(req, res) {
  res.json(req.tiger)
})
.put(function(req, res) {
  let updatedTiger = req.body
  if (updatedTiger.id) {
    delete updatedTiger.id
  } 
  let tigerIndex = _.findIndex(tigers, {id: req.params.id})
  if (tigers[tigerIndex]) {
    tigers[tigerIndex] = Object.assign(tigers[tigerIndex], updatedTiger)
    res.json(tigers[tigerIndex])
  } else {
    res.status(404).send('Tiger not found')
  }
});

module.exports = tigerRouter
