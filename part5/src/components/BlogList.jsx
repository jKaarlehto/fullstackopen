import {useRef} from 'react'

import Blog from '../components/Blog'
const BlogList = ({blogs, setBlogs}) => {


   return (
       <div>
	<h2>blogs</h2>
       {blogs
	   .sort((a, b) => b.likes - a.likes)
	   .map(blog => 
	   <Blog key={blog.id} blog={blog} allBlogs={blogs} setBlogs={setBlogs}/> //this is fucking stupid
       )}
       </div>
   )

}


export default BlogList
