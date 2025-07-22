require('dotenv').config()

const express = require('express');
const Person = require('./models/person');
const app = express();


const PORT = process.env.PORT || 3001;

app.use(express.static('dist'))

// Middleware to parse JSON body
app.use(express.json());
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// Route to show the length of the frontend and the current time
app.get('/info', (req, res) => {
  const info = `
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
  `;
  res.send(info);
});

// Route to get all persons
app.get('/api/persons', async (req, res) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch persons from the database'});
  }
});

// Route to get a single person by ID
app.get('/api/persons/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({error: 'Person not found'});
    }
    res.json(person);
  } catch (error) {
    res.status(400).json({error: 'Malformatted ID'});
  }
});

// Route to add a new person
app.post('/api/persons', async (req, res) => {
  const {name, number} = req.body;

  if (!name || !number) {
    return res.status(400).json({error: 'Name and number are required'});
  }

  try {
    const newPerson = new Person({name, number});
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(500).json({error: 'Failed to save person to the database'});
  }
});

// Route to delete a person by ID
app.delete('/api/persons/:id', async (req, res) => {
  try {
    const result = await Person.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({error: 'Person not found'});
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({error: 'Malformatted ID'});
  }
});


// middleware for wrong path
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
