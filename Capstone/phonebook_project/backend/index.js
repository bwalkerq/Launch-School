const express = require('express');
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


// Phonebook data
let phonebook = [
  {id: "1", name: "Arto Hellas", number: "040-123456"},
  {id: "2", name: "Ada Lovelace", number: "39-44-5323523"},
  {id: "3", name: "Dan Abramov", number: "12-43-234345"},
  {id: "4", name: "Mary Poppendieck", number: "39-23-6423122"},
];

// Route to show the length of the frontend and the current time
app.get('/info', (req, res) => {
  const info = `
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>
  `;
  res.send(info);
});

// Route to get all persons
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Route to get a single person by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebook.find(p => p.id === id);
  if (!person) {
    return res.status(404).json({error: 'Person not found'});
  }
  res.json(person);
});

// Route to add a new person
app.post('/api/persons', (req, res) => {
  const {name, number} = req.body;

  if (!name || !number) {
    return res.status(400).json({error: 'Name and number are required'});
  }

  const id = Math.random().toString(36).substr(2, 10); // Generate a new ID using Math.random
  const newPerson = {id, name, number};
  phonebook.push(newPerson);
  res.status(201).json(newPerson);
});

// Route to delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = phonebook.length;
  phonebook = phonebook.filter(p => p.id !== id);

  if (phonebook.length === initialLength) {
    return res.status(404).json({error: 'Person not found'});
  }

  res.status(204).end();
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
