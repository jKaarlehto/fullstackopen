import { useState, useEffect } from 'react'
import axios from 'axios'
import TableRenderer from './components/Numbers.jsx'
import SearchBar from './components/Searchbar.jsx'
import InputForm from './components/InputForm.jsx'
import personService from './services/notes.jsx' 



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newResult, setNewResult] = useState(persons)

  useEffect(() => {
	axios
	    .get('http://localhost:3001/persons')
	    .then(response => {
		setPersons(response.data)
		setNewResult(response.data)
	    })
    }, []) 


  const handleNewPerson = (event) => {

      event.preventDefault()
      if (persons.find(existingPerson => existingPerson.name === newName)) {
	return alert(`${newName} is already in the phonebook`)
      }
      const person = { name: newName, number: newNumber }
      personService.create(person).then(response => {
	  console.log(response)
	  let updatedPersons = persons.concat(response)
	  setPersons(updatedPersons)
	  handleChangeResult(updatedPersons)
	  console.log("Submitted", event.target, updatedPersons)
      }
      )

      setNewName('')
      setNewNumber('')
      setNewSearch('')
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

  const handleChangeResult = (result) => {
      setNewResult(result)

  }

      
  const fields = {
	name: {
	  name: 'Name',
	  value: newName,
	  onChange: handleChangeName,
	  type: 'text',
	},
	number: {
	  name: 'Number',
	  value: newNumber,
	  onChange: handleChangeNumber,
	  type: 'text',
	},
    };


  return (
    <div>
      <h2>Phonebook</h2>
      <SearchBar index={persons} searchKey="name" searchString={newSearch} updateSearchString={handleChangeSearch} updateResults={handleChangeResult}/>
      <h2>Add a new contact:</h2>
      <InputForm fields={fields} onSubmit={handleNewPerson} />
      <h2>Numbers</h2>
      <TableRenderer table={newResult} />
    </div>
  )

}

export default App
