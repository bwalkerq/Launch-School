// Persons.js
import Person from './Person'

const Persons = ({ persons }) => (
  <>
    <h2>Numbers</h2>
    {persons.map(person => (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
      />
    ))}
  </>
)

export default Persons
