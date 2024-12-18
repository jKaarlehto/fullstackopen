const TableRenderer = ({table, filter}) => {

let headers = table.reduce((allFields,item) => {
    Object.keys(item).forEach((key) => allFields.add(key))
    return allFields }
    ,new Set() )

headers = Array.from(headers)

let filteredItems = table.filter(item => item[filter.key].toLowerCase().includes(filter.string.toLowerCase()))


return (
<table>
    <thead>
	<tr>
	    {headers.map(header =>
	    <th key={header}>{header}</th>)}
	</tr>
    </thead>
    <tbody>
	{filteredItems.map(item => {
	    return <tr key={item.name}>{headers
		.filter(header => item.hasOwnProperty(header))
		    .map(header => <td key={`${item.name}/${header}`}>{item.header}</td>)}
	    </tr>})}
	
    </tbody>
</table>
)
}

export default TableRenderer 
