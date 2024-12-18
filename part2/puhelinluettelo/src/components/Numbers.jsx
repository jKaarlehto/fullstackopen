import {useState} from 'react'

const Numbers = ({persons}) => {

//Get all unique fields. 
let headers = persons.reduce((allFields,person) => {
    Object.keys(person).forEach((key) => allFields.add(key))
    return allFields }
    ,new Set() )

headers = Array.from(headers)

return (
<table>
    <thead>
	<tr>
	    {headers.map(header =>
	    <th key={header}>{header}</th>)}
	</tr>
    </thead>
    <tbody>
	{persons.map(person => 
	<tr key={person.name}>
	    <td>{person.name}</td>
	</tr>)} 
    </tbody>
</table>
)
}

export default Numbers
