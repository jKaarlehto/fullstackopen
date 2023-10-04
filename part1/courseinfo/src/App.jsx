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

//combining courses and exercises so they are easier to pass as props to Part component
  const courseParts = {
	"part1" : [part1, exercises1],
	"part2" : [part2, exercises2],
	"part3" : [part3, exercises3]
  }


  return (
    <div>
     	<Header course={course} />
	<Content parts={courseParts} />
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

const Content = ({parts}) => {
	return(
		<div>
			<Part dict={parts} dictKey={"part1"}/>
			<Part dict={parts} dictKey={"part2"}/>
			<Part dict={parts} dictKey={"part3"}/>	
		</div>
	);
}

const Part = ({dict, dictKey}) => {
	// a better implementation would cycle through indexes and concatenate etc.
return (
	//For some reason the syntax needs to be this instead of dict.dictKey[0], otherwise the key is not right at runtime.
		<p>{dict[dictKey][0]} {dict[dictKey][1]}</p>
	);
}


const Total = (props) => {
	
	{/*Should take props as an array and sum them up in the component.*/}
	return(
		<p> Number of exercises {props.first + props.second + props.third} </p>
	);
}
export default App
