// App.js
import { useState, useEffect } from 'react'

import Filter from "./components/Filter.jsx";
import PersonForm from './components/PersonForm.jsx'
import Persons    from './components/Persons.jsx'
import axios from "axios";


const App = () => {
  const [persons, setPersons]       = useState([])
  const [newName, setNewName]       = useState('')
  const [newNumber, setNewNumber]   = useState('')
  const [filter, setFilter]         = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  const addPerson = e => {
    e.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObject = {
      name:   newName,
      number: newNumber,
      id:     persons.length + 1
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterValue={filter}
        onFilterChange={setFilter}
      />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={addPerson}
      />
      {/**/}

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
