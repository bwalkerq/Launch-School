// App.js
import { useState } from 'react'

import Filter from "./components/Filter.jsx";
import PersonForm from './components/PersonForm.jsx'
import Persons    from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons]     = useState([
    { name: 'Arto Hellas',      number: '040-123456',    id: 1 },
    { name: 'Ada Lovelace',     number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov',      number: '12-43-234345',  id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName]       = useState('')
  const [newNumber, setNewNumber]   = useState('')
  const [filter, setFilter]         = useState('')

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
