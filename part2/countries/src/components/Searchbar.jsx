
import {useEffect} from 'react'
//nama voisi laittaa myos yhtena objektina, ja sitten destruktoida: const {index, searchString jne...} = props
//getNestedValue tarvitaan, jos hakukentta ei ole suoraan referoitavana indeksin objektista.
const getNestedValue = (obj, keys) => {
  if (typeof keys == "string" ) return keys
  return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

const SearchBar = ({index, searchString, updateSearchString, updateResults, searchKey}) => {

    const handleSearch = (event) => {
	let matches = index.filter(item => getNestedValue(item,searchKey).toLowerCase().includes(event.target.value.toLowerCase()))
	updateSearchString(event)
	updateResults(matches)
    }
    

    //talla saadaan result paivitettya aina kun persons paivittyy, joten hakua ei tarvii nollata
    useEffect(() => {
	updateResults(index.filter(
	    item => getNestedValue(item,searchKey).toLowerCase().includes(searchString.toLowerCase())))
    },[index])

    
    return (

	<div>
	<input value={searchString} placeholder={searchKey} type="text" onChange={handleSearch} />
	</div>
   )

}

export default SearchBar
