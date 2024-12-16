import { useState } from 'react'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  const counts = [
    {name: 'good', value: good},
    {name: 'neutral', value: neutral},
    {name: 'bad', value: bad}
  ]

  return (
      <div>
	<Header text="Give feedback"/>
	<Button handler={() => setGood(good + 1)} name="good"/>
	<Button handler={() => setNeutral(neutral + 1)} name="neutral"/>
	<Button handler={() => setBad(bad + 1)} name="bad"/>
	<Header text="Statistics"/>
	<ListPairs pairs={counts}/>	
      </div>
  )
}

const Header = ({text}) => {
    return (
	<h1>{text}</h1>
    )
}	

const Button = ({name, handler}) => {
    return (
	<button onClick={handler}> {name} </button>
    )
}

const ListPairs = ({pairs}) => {
    console.log(pairs)
    return (
	<ul>
	    {pairs.map(pair => (<li> {pair.name} : {pair.value} </li>))}
	</ul>
    )

}
    
export default App
