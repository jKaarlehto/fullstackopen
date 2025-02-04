

import Togglable from '../components/Toggleable'
import Blog from '../components/Blog'
const BlogList = ({blogs}) => {

   return (
       <div>
	<h2>blogs</h2>
       {blogs.map(blog => 
	   <Blog key={blog.id} blog={blog} />
       )}
       </div>
   )

}


export default BlogList
