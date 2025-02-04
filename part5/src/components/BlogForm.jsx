import {useState} from 'react'

const BlogForm = ({handleNewBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
	event.preventDefault()
	handleNewBlog({title,author,url})
    }

    return (
	<div>
	    <h2>Create new</h2>
	    <form onSubmit={addBlog}>
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

export default BlogForm
