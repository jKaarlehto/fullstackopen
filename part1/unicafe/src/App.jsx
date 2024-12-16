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
	<h2>{text}</h2>
    )
}	

const Button = ({name, handler}) => {
    return (
	<button onClick={handler}> {name} </button>
    )
}


const StatisticLine = ({text, value}) => {
    return (
	<tr>
	    <td>{text}</td>
	    <td>{value}</td>
	</tr>
    )
}

const Statistics = ({ratings, displayKeys}) => {
    let ratingCount = ratings.reduce((acc,current) => acc + current.count, 0)
    let positiveCount = ratings.reduce((acc,current) => acc + (current.value > 0 ? current.count : 0), 0 )
    let ratingScore = ratings.reduce((acc,current) => acc + current.count*current.value,0)

    //1.9 konditionaalinen renderointi tekee naista ehtolauseista turhia, mutta jatataan ne kuitnkin
    let averageRating = ratingCount > 0 ? (ratingScore/ratingCount).toPrecision(3): ""
    let positiveFrac = ratingCount >0 ? (positiveCount/ratingCount * 100).toPrecision(3) + "%" : ""
    
    let stats = <p>Average: {averageRating}, Positive: {positiveFrac} </p>

    if (ratingCount == 0) {
	return (<p>No feedback given</p>)
    }
    
    return(
	<div>
	    <table>
		<tbody>	
		<StatisticLine text="good" value={ratings.find(item => item.name == "good").count}/>
		<StatisticLine text="neutral" value={ratings.find(item => item.name == "neutral").count}/>
   		<StatisticLine text="bad" value={ratings.find(item => item.name == "bad").count}/>
		<StatisticLine text="all" value={ratingCount}/>
		<StatisticLine text="average" value={averageRating}/>
		<StatisticLine text="positive" value={positiveFrac}/>
		</tbody>
	    </table>
	</div>
    )

}
    
export default App
