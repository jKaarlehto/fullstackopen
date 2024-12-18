import { useState } from 'react'
import TableRenderer from './components/Numbers.jsx'

const App = () => {
    const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456' },
	{ name: 'Ada Lovelace', number: '39-44-5323523' },
	{ name: 'Dan Abramov', number: '12-43-234345' },
	{ name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const handleNewPerson = (event) => {

      event.preventDefault()
      if (persons.find(existingPerson => existingPerson.name === newName)) {
	return alert(`${newName} is already in the phonebook`)
      }
      const updatedPersons = persons.concat({name: newName, number: newNumber})
      setPersons(updatedPersons)
      setNewName('')
      setNewNumber('')
      console.log("Submitted", event.target, updatedPersons)
  }

  const handleChangeName = (event) => {
      setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
      //input should only contain 0-9, + or -
      if (/^[0-9+-]*$/.test(event.target.value)) {
      setNewNumber(event.target.value)
      }
      else return 
  }

  const handleChangeSearch = (event) => {
	setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      search names: <input value={newSearch} type="text" onChange={handleChangeSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} type="text" onChange={handleChangeName} />
        </div>
        <div>
	  number: <input value={newNumber} type="text" onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <TableRenderer table={persons} filter={{string: newSearch, key: "name"}}/>
      ...
    </div>
  )

}

export default App
