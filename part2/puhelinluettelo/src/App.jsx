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
  const [newNotification, setNotification] = useState({})

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
      const existingPerson = persons.find(existingPerson => existingPerson.name === newName) 
      if (existingPerson && window.confirm(`${newName} exists already, replace old number?`)) {
	    const request = personService.patch(existingPerson.id,{number: newNumber})
	    request.then( response => { 
		const updatedPersons = persons.map(person =>
		  person.id === response.id
		    ? { ...person, number: response.number }
		    : person
		);
		 console.log(updatedPersons)
		 setPersons(updatedPersons)
		 setNotification(
		     {message:`${response.name} updated`}
		 )
		 setTimeout (() => {
		     setNotification({})
		 },3000)
		
	    })
	  return
      }
      const person = { name: newName, number: newNumber }
      personService.create(person).then(response => {
	  let updatedPersons = persons.concat(response)
	  console.log(updatedPersons)
	  setPersons(updatedPersons)
	  setNotification(
	      {message:`${person.name} created`}
	  )
	  setTimeout (() => {
	      setNotification({})
	  },3000)
      }
      )

      setNewName('')
      setNewNumber('')
      setNewSearch('')
  }
 
  const handleDeletePerson = (item) => {
     if (!window.confirm(`Delete ${item.name}?`)) return
     console.log(`deleteting: ${item.name}`)
     const request = personService.remove(item.id)
     request.then(response => {
	 console.log(`deleted: ${item.name} with status ${response}`)
	 setNotification({message: `Deleted ${item.name}`})
	 return personService.getAll()
  }).then(response => {
	  console.log(`setting persons to ${response[0]}`)
	  setPersons(response)
  }).catch(error => {
	console.log(error)
	setNotification({message:`Failed to delete ${item.name}: ${error.response.statusText}`, type:"error"})
	setTimeout(() => {
	    setNotification({})
	},3000)
  })
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
      console.log('updating results')
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
      <Notification notification={newNotification} />
      <SearchBar index={persons} searchKey="name" searchString={newSearch} updateSearchString={handleChangeSearch} updateResults={handleChangeResult}/>
      <h2>Add a new contact:</h2>
      <InputForm fields={fields} onSubmit={handleNewPerson} />
      <h2>Numbers</h2>
      <TableRenderer table={newResult} onClick={handleDeletePerson} />
    </div>
  )

}

const Notification = ({notification: { message, type }}) => {
    const notificationStyle = {
      backgroundColor: 'lightgray',
      color: type != "error" ? 'darkgreen' : 'red',
      border: type != "error" ? '2px solid lightgreen' : '2px solid lightred',
      borderRadius: '12px',
      padding: '10px 20px',
      fontWeight: 'bold',
    };

  if (message === undefined) {
    return null
  }

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
}
export default App
