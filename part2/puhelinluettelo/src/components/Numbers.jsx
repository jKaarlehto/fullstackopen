const TableRenderer = ({table,onClick}) => {


//tama kannattaisi refaktoroida niin etta suodatus tapahtuu jossain muualla.
let headers = table.reduce((allFields,item) => {
    Object.keys(item).forEach((key) => allFields.add(key))
    return allFields }
    ,new Set() )

headers = Array.from(headers)
const filteredItems = Array.from(table)

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
	  <td>
	  <input type='Button' value='Delete' readOnly={true} onClick={() => onClick(item)} />
	  </td>
	</tr>
      ))}
    </tbody>
</table>
)
}

export default TableRenderer 
