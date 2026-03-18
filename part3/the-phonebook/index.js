const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' }
]

// 3.2 - info page
app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

// 3.1 - get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// 3.3 - get single person
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)
  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }
  res.json(person)
})

// 3.4 - delete person
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

// 3.5 + 3.6 - add person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  // 3.6 - validation
  if (!name) {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!number) {
    return res.status(400).json({ error: 'number is missing' })
  }
  if (persons.find(p => p.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1_000_000)),
    name,
    number
  }

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})