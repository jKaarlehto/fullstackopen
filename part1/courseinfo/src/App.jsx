//Exercises in separate commits
//
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
	<Header course={course}/> 
	<Content part={part1}/>
	<Content part={part2}/>
	<Content part={part3}/>
	<Total part1={part1} part2={part2} part3={part3}/>
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

const Content = ({part}) => {
	return(
		<>
			<p>{part["name"]}</p>
			<p>{part["exercises"]}</p>
		</>
	);
}

const Total = (props) => {
	
	{/*Should take props as an array and sum them up in the component.*/}

	console.log(props)
	return(
		<p> Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises} </p>
	);
}

export default App
