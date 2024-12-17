//Exercises in separate commits
//
const App = () => {
        const course = {
            name: 'Half Stack application development',

            parts: [
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
        }

        return (

            <div>
	    <Course course={course} />
            </div>
        );
}

    const Course = ({course}) => {

	return (
	    <div>
	    <Header course={course}/> 
	    <Content course={course}/>
	    <Total course={course}/>
	    </div>
	)
    }

    const Header = ({course}) => {

      return(
        <>
          <h1>{course.name}</h1>
        </>
      );
    }

    const Content = ({course}) => {
          return(
            <div>
              {course.parts.map(part => <p key={part.name}>  {part.name} {part.exercises} </p>)}
            </div>
          );
    }

    const Total = ({course}) => {
        const parts = course.parts 
	console.log(parts)
	let total = parts.reduce((sum,current) => current.exercises + sum,0)
      return(
        <p> Number of exercises {total} </p>
      );
    }

export default App
