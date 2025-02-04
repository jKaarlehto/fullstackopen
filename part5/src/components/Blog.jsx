import Togglable from '../components/Toggleable'
import blogService from '../services/blogs'
import { useState} from 'react'
const Blog = ({ blog }) => {

const [blogStats, setBlogStats] = useState(blog)

const addLike = async () => {
    const newBlogStats = await blogService.like(blog)
    setBlogStats(newBlogStats)
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
	  </tbody>
	</table>
    </Togglable>
</div>  
)
}

export default Blog
