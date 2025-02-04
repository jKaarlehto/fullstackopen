import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState([])
	const [password, setPassword] = useState([])
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

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
	      //blogService.setToken(user.token)
	    }
	  }, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user)) 
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (error) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	
	const handleLogout = async () => {
	    setUser(null)
	    window.localStorage.removeItem('loggedBlogsAppUser')
	}

	const loginForm = () => {
	    return (
	    <div>
		<h2>Login</h2>
			  <h3>{errorMessage}</h3>
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

	const blogsForm = () => {
	    return (
		<div>	    
		    <h2>blogs</h2>
		    {blogs.map(blog =>
			    <Blog key={blog.id} blog={blog} />
		    )}
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
	    {!user && loginForm()}
	    {user && blogsForm()}
	    </div>
		)
	
}

	export default App
