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
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')


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

	const handleNewBlog = async (event) => {
	    event.preventDefault()
	    blogService.create({title, author, url})
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
	
	const blogSubmitter = () => {
	    return (
		<div>
		    <h2>Create new</h2>
		    <form onSubmit={handleNewBlog}>
		    Author:
		    <input name="author" type="text" value={author} onChange={({target}) => setAuthor(target.value)}/><br/>
		    Title:
		    <input name="title" type="text" value={title} onChange={({target}) => setTitle(target.value)}/><br/>
		    URL:
		    <input name="url" type="text" value={url} onChange={({target}) => setUrl(target.value)}/><br/>
		    <input type="submit"/>
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
	    {!user && loginForm()}
	    {user && blogsForm()}
	    {user && blogSubmitter()}
	    </div>
		)
	
}

	export default App
