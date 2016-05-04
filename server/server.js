// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
app.get('/lions', function _handleLions_(req, res) {
  res.status(200).json(lions);
});

app.get('/lions/:id', function _handleLion_(req, res) {
  let lion = _.find(lions, {id: parseInt(req.params.id)});
  if (lion) {
    res.status(200).json(lion);
  } else {
    res.status(404).send('lion not found');
  }
});

app.post('/lions', function _handleCreateLions_(req, res) {
  lions.push(Object.assign(req.body, {id: id}));
  id++;
  res.status(201).json(req.body);
});

app.put('/lions/:id', function _handleUpdateLions_(req, res) {
  let lion = lions[req.params.id]
  if (lion && lion.id.toString() === req.params.id) {
    lion = Object.assign(lion, req.body);
    lions[req.params.id] = lion
    res.status(200).json(lion);
  } else {
    res.status(404).send('lion not found');
  }
});

app.delete('/lions/:id', function _handleDeleteLions_(req, res) {
  let lion = lions[req.params.id];
  if (lion && lion.id.toString() === req.params.id) {
    lions[req.params.id] = null;
    res.status(200).json(req.body);
  } else {
    res.status(404).json('lion not found');
  };
});

app.listen(8000);
console.log('on port 8000');
