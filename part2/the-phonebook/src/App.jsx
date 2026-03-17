
import './App.css'
import { useState ,useEffect} from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import Notification from './Notification'
import personsService from './services/persons'
const baseUrl = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })
  useEffect(() => {
    personsService.getAll().then(data => setPersons(data))
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 3000)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (!confirmed) return

      personsService
        .update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${updatedPerson.name}'s number`)
        })
        .catch(() => {
          showNotification(
            `Information of ${existingPerson.name} has already been removed from server`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })
      return
    }

    personsService
      .create({ name: newName, number: newNumber })
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${createdPerson.name}`)
      })
      .catch(() => {
        showNotification('Failed to add person', 'error')
      })
  }

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return


    personsService
      .remove(id)
      .then(() => {    personsService
        .remove(id)
        setPersons(persons.filter(p => p.id !== id))
        showNotification(`Deleted ${name}`)
      })
      .catch(() => {
        showNotification(`${name} has already been removed from server`, 'error')
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App