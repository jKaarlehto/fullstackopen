import { all } from 'axios'
import Togglable from '../components/Toggleable'
import blogService from '../services/blogs'
import { useState, useImperativeHandle, forwardRef} from 'react'

const Blog = ({blog, setBlogs, allBlogs}) => {

const addLike = async () => {
    const newBlog = await blogService.like(blog)
    const newAllBlogs = allBlogs.map(b => (b.id === newBlog.id) ? newBlog : b)
    setBlogs(newAllBlogs)
}

const remove = async () => {
    if (!(window.confirm(`Do you really want to remove ${blog.title}`))) return
    try {
    await blogService.remove(blog)
    const newAllBlogs = allBlogs.filter(b => (b.id !== blog.id))
    setBlogs(newAllBlogs)
    } catch (error) {
	alert(error.response.data.error || 'Cannot delete')
    }

}

return (
<div style={{ display: "flex", justifyContent: "space-between", border: "2px solid black", margin: "5px 5px", width: "50%"}}>
    <div style={{paddingRight: '20px'}}>
    {blog.title}
    </div>
    <Togglable buttonLabel='show'>
	<table>
	  <tbody>
	    <tr>
		<td>URL</td>
		<td>{blog.url}</td>
	    </tr>
	    <tr>
		<td>Likes</td>
		<td>{blog.likes}</td>
		<td><button onClick={addLike}>like</button></td>
	    </tr>
	    <tr>
		<td>Author</td>
		<td>{blog.author}</td>
	    </tr>
	    <tr>
		<td><button onClick={remove}>remove</button></td>
	    </tr>
	  </tbody>
	</table>
    </Togglable>
</div>  
)
}

export default Blog
