const TableRenderer = ({table, filter}) => {


//tama kannattaisi refaktoroida niin etta suodatus tapahtuu jossain muualla.
console.log(filter)
let headers = table.reduce((allFields,item) => {
    Object.keys(item).forEach((key) => allFields.add(key))
    return allFields }
    ,new Set() )

headers = Array.from(headers)

const filteredItems = Array.from(table.filter(item => item[filter.key].toLowerCase().includes(filter.string.toLowerCase())))

console.log(filteredItems)
return (
<table>
    <thead>
	<tr>
	    {headers.map(header =>
	    <th key={header}>{header}</th>)}
	</tr>
    </thead>
    <tbody>
      {filteredItems.map(item => (
	<tr key={`${Object.values(item)[0]}`}>
	  {headers
	    .filter(header => item.hasOwnProperty(header))
	    .map(header => (
	      <td key={header}>{item[header]}</td>
	    ))}
	</tr>
      ))}
    </tbody>
</table>
)
}

export default TableRenderer 
