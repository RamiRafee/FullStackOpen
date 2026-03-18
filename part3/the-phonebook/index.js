const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// 3.8: create a custom token that captures the request body
morgan.token('body', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

// 3.7 + 3.8: use tiny config but add the custom :body token at the end
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)
  if (!person) return res.status(404).end()
  res.json(person)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }
  if (persons.find(p => p.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name,
    number
  }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))