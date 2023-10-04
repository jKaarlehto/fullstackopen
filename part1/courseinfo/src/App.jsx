//Exercises 1.1 and 1.2 in separate commits
//
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>
     	<Header course={course} />
	  {/*God awful*/}
	<Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
	  {/*Should pass props as an array and sum them up in the component.*/}
	<Total first={exercises1} second={exercises2} third={exercises3}/>
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

const Content = (props) => {
	return(
		<>
	<p> {props.part1} {props.exercises1} </p>
	<p> {props.part2} {props.exercises2} </p>
	<p> {props.part3} {props.exercises3} </p>

		</>
	);
}
const Total = (props) => {
	return(
		<p> Number of exercises {props.first + props.second + props.third} </p>
	);
}
export default App
