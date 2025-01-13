

//nama voisi laittaa myos yhtena objektina, ja sitten destruktoida: const {index, searchString jne...} = props
const SearchBar = ({index, searchString, updateSearchString, updateResults, searchKey}) => {
    
    const handleSearch = (event) => {
	updateSearchString(event)
	updateResults(index.filter(
	    item => item[searchKey].toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (

	<div>
	Search: <input value={searchString} placeholder={searchKey} type="text" onChange={handleSearch} />
	</div>
   )

}
 export default SearchBar
