//Exercises in separate commits
const App = () => {
  const course = 'Half Stack application development'
  const parts =[ 
	  {
    name: 'Fundamentals of React',
    exercises: 10
  },
	  {
    name: 'Using props to pass data',
    exercises: 7
  },
	  {
    name: 'State of a component',
    exercises: 14
  }
  ]
  return (
    <div>
	<Header course={course}/> 
	<Content parts={parts}/>
	<Total parts={parts}/>
    </div>
  )
}


const Header = ({course}) => {

	return(
		<>
			<h1>{course}</h1>
		</>
	);
}

const Content = ({parts}) => {
	console.log(parts)
	return(
		<>
		<p>{parts[0].name} {parts[0].exercises}</p>
		<p>{parts[1].name} {parts[1].exercises}</p>
		<p>{parts[2].name} {parts[2].exercises}</p>
		</>
	);
}

const Total = ({parts}) => {
	
	{/*Should take props as an array and sum them up in the component.*/}

	return(
		<p> Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises} </p>
	);
}

export default App
