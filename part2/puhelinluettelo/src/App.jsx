import { useState } from 'react'
import Numbers from './components/Numbers.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleNewPerson = (event) => {

      event.preventDefault()
      const updatedPersons = persons.concat({name: newName})
      setPersons(updatedPersons)
      setNewName('')
      console.log("Submitted", event.target, updatedPersons)
  }
  const handleChangeName = (event) => {
      setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
      ...
    </div>
  )

}

export default App
