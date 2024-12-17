import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const  getRandomIndex = () => Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(anecdotes[getRandomIndex()])

  //Alkuarvot pitaa asettaa nain, jotteivat ne asetu joka kerralla, kun komponentti renderoidaan.
  const [votes, setVotes] = useState(() => {
    let voteMap = new Map()
    anecdotes.forEach(anecdote => (voteMap.set(anecdote,0)))
    return voteMap
  })

  const vote = (selected) => {
    let updatedValue = votes.get(selected)+1
    let updatedVotes = new Map(votes)
    updatedVotes.set(selected,updatedValue)
    setVotes(updatedVotes)
        }

  return (
    <div>
      <h2> Anecdote of the day </h2>
      <p>
      {selected}
      </p>
      <p>
      has {votes.get(selected)} votes.
      </p>
      <button onClick={() => setSelected(anecdotes[getRandomIndex()])}> next anecdote </button>
      <button onClick={() => vote(selected)}> vote </button>
      <h2> Anecdote with most votes </h2>
      <Leaderboard votes={votes} />
      
    </div>
  )
}

const Leaderboard = ({votes}) => {

    let max = votes.entries().reduce((max, entry) => {
	const [key, value] = entry
	return value > max[1] ? entry : max
    })
    
    if (max[1] == 0) {
	return <p> No votes </p>
    }
    return <div><p>{max[0]}</p><p>has {max[1]} votes</p></div>
}


export default App
