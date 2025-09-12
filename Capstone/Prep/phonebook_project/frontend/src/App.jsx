// App.js
import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from './components/PersonForm.jsx'
import Persons    from './components/Persons.jsx'
import contactService from './services/contacts.js'


const App = () => {
  const [persons, setPersons]       = useState([])
  const [newName, setNewName]       = useState('')
  const [newNumber, setNewNumber]   = useState('')
  const [filter, setFilter]         = useState('')

  useEffect(() => {
    contactService.getAll()
      .then(data => {
        setPersons(data)
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
    }

    contactService.create(nameObject).then(response => {
      setPersons(persons.concat(response))
    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    contactService.delete(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
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

      <Persons persons={personsToShow} onDelete={deletePerson}/>
    </div>
  )
}

export default App
