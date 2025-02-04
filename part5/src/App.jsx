import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Toggleable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState([])
	const [password, setPassword] = useState([])
	const [user, setUser] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const blogFromRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
	    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
	    if (loggedUserJSON) {
	      const user = JSON.parse(loggedUserJSON)
	      setUser(user)
	      blogService.setToken(user.token)
	    }
	  }, [])
	
	const notification = ({error, message}) => {

	    const style = {
		border: `2px solid ${error ? "red" : "green"}`,
		color: error ? "red" : "green",
		padding: "20px",
		borderRadius: "10px",
		textAlign: "center",
		fontWeight: "bold",
	      };
	    setTimeout(() => {
		setNotificationMessage(null)
	    },5000) 
	    setNotificationMessage(
		    <div style={style}>
		    <p>{error ? error : message}</p>
		    </div>
	    )
	    return
	}
	    

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
		    	const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user)) 
			setUser(user)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')
		} catch (error) {
			console.log('setting notification')
			notification({error:'wrong credentials'})
		}
	}
	
	const handleLogout = async () => {
	    setUser(null)
	    window.localStorage.removeItem('loggedBlogsAppUser')
	}

	const handleNewBlog = async ({title, author, url}) => {
	    try {
	    const response = await blogService.create({title, author, url})
	    const newBlogs = await blogService.getAll()
	    setBlogs(newBlogs)
	    notification({message: `Created ${response.data.title}`})
	    blogFromRef.current.toggleVisibility()
	    } catch (error) {
	    notification(error.response.data)
	    }

	}

	const loginForm = () => {
	    return (
	    <div>
		<h2>Login</h2>
			  <form onSubmit={handleLogin}>
			    <div>
			      username
				<input
				type="text"
				value={username}
				name="Username"
				onChange={({ target }) => setUsername(target.value)}
			      />
			    </div>
			    <div>
			      password
				<input
				type="password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
			      />
			    </div>
			    <button type="submit">login</button>
			  </form>
	    </div>
	    )
	}
	
	return (
	    <div>
	    <p>
		{user ?
		(<>Logged in as {user.name} <button onClick={handleLogout}>Logout</button></>)
		:
		(null)	
	    }</p>
	    {notificationMessage}
	    {!user && loginForm()}
	    {user && <BlogList blogs={blogs}/>}
	    {user && <Togglable buttonLabel='New blog' ref={blogFromRef}>
			<BlogForm handleNewBlog={handleNewBlog}/>
		    </Togglable>}
	    </div>
		)
	
}

	export default App
