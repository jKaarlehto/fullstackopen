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

export default Course


