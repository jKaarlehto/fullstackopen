import { useState, useEffect } from 'react'
import './App.css'
import countriesService from './services/CountriesService.jsx'
import Searchbar from './components/Searchbar.jsx'
import TableRender from './components/TableRenderer.jsx'
import axios from 'axios'

function App() {
    /*using components from puhelinluettelo*/
  const [countries, setCountries] = useState([]) 
  const [resultCountries, setResultCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
     let request = countriesService.getAll()
      .then((response) => {
	  setCountries(response)
	  console.log(`Set initial countries to: ${response}`)
      })
  },[])
  
  const handleChangeSearch = (event) => {
      setSearchString(event.target.value)
      }
  const handleChangeResult = (result) => {
      setResultCountries(result)
    }

  return (
    <>
      <div>
      <Searchbar index={countries} searchKey={["name","common"]} searchString={searchString} updateResults={handleChangeResult} updateSearchString={handleChangeSearch} />  
      <TableRender table={resultCountries} searchString={searchString} />
      </div>
    </>
  )
}

export default App
