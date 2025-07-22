// Persons.js
import Person from './Person.jsx'

const Persons = ({ persons, onDelete }) => (
  <>
    <h2>Numbers</h2>
    {persons.map(person => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        onDelete={() => onDelete(person.id)}
      />
    ))}
  </>
)

export default Persons
