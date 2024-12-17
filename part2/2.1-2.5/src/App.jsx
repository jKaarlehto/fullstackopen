//Exercises in separate commits
//
const App = () => {
    const courses = [
	{
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
                },
		{
		name: 'How to Train Your Houseplant to Speak',
		exercises: 86
		}
            ]
        },
	{
            name: 'Quarter queue software production',

            parts: [
                {
                name: 'Fundamentals of Angular',
                exercises: 10
                },
                {
                name: 'Using data to pass data',
                exercises: 7
                },
                {
                name: 'State of affairs',
                exercises: 14
                },
		{
		name: 'How to convince people you are invisible',
		exercises: 86
		}
            ]
        },
    ]

        return (
	    
            <div>
	    {courses.map(course => <Course course={course} key={course.name} />)}
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
	//2.3 oli jo tehty 2.1 vaiheessa
	let total = parts.reduce((sum,current) => current.exercises + sum,0)
      return(
        <p> Number of exercises {total} </p>
      );
    }

export default App
