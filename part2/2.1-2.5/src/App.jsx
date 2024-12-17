//Exercises in separate commits
import Course from './components/Course.jsx'

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

export default App
