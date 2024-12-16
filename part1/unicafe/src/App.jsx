import { useState } from 'react'


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  const ratings = [
    {name: 'good', count: good, value: 1},
    {name: 'neutral', count: neutral, value: 0},
    {name: 'bad', count: bad, value: -1}
  ]

  return (
      <div>
	<Header text="Give feedback"/>
	<Button handler={() => setGood(good + 1)} name="good"/>
	<Button handler={() => setNeutral(neutral + 1)} name="neutral"/>
	<Button handler={() => setBad(bad + 1)} name="bad"/>
	<Statistics ratings={ratings} displayKeys={["name","value"]}/>
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

const ListPairs = ({items, keys}) => {
    return (
	<ul>
	    {items.map(pair => (<li key={pair[keys[0]]}> {pair[keys[0]]} : {pair[keys[1]]} </li>))}
	</ul>
    )
}

const Statistics = ({ratings, displayKeys}) => {
    let ratingCount = ratings.reduce((acc,current) => acc + current.count, 0)
    let positiveCount = ratings.reduce((acc,current) => acc + (current.value > 0 ? current.count : 0), 0 )
    let ratingScore = ratings.reduce((acc,current) => acc + current.count*current.value,0)

    let averageRating = ratingCount > 0 ? (ratingScore/ratingCount).toPrecision(3): ""
    let positiveFrac = ratingCount >0 ? (positiveCount/ratingCount * 100).toPrecision(3) + "%" : ""
    
    return(
	<div>
	<Header text="Statistics"/>
	<ListPairs items={ratings} keys={displayKeys}/>	
	<p>Average: {averageRating}, Positive: {positiveFrac} </p>
	</div>
    )

}
    
export default App
