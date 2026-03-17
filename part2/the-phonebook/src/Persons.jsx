const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </p>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default Persons