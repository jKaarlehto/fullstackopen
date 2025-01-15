import {useEffect, useState} from 'react'
import Country from './Country.jsx'
const TableRenderer = ({table,searchString,onClick}) => {

    const [render, setRender] = useState(<p>Use the search bar to find countries</p>)

    useEffect(() => {
	if (searchString.length === 0) {
	    setRender(<p>Use the search bar to find countries</p>)
	    return
	}
	if (table.length >= 10) {
	   setRender(<p>Too many matches, narrow your search</p>)
	    return
	}
	if (1 < table.length ) {
	    setRender(
	    <ul>
		{table.map((country) => (
		  <li key={country.ccn3}>
		    {country.name.common}
		    <input type="button" onClick={() => {
			setRender(<Country country={country}/>)
		    }} value="Show"/>
		  </li>
		))}
	    </ul>
	    )
	    console.log(`Rendering 10 > results`)
	    return
	}
	//only one result
	if (table.length === 1) {
	console.log(`Rendering country`)
	let country = table[0]
	setRender(<Country country={country}/>)
	} else setRender(<p> No matches </p>)
    },[table]
    )
    return (
	render
    )
}
export default TableRenderer 
