import axios from 'axios'
import {useState} from 'react'
const baseUrl = '/api/blogs'

let token; //should be accessible for all the functions of this service

const setToken = (newToken) => {
    console.log("set new token")
    token = `Bearer ${newToken}` 
}

const getAuthHeaderConfig = () => {
    if (!token) return null
    return { headers: { Authorization: token },}
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({title, author, url}) => {
    console.log("creating new blog")
    const body = {title, author, url}
    const response = await axios.post(baseUrl, body, getAuthHeaderConfig())
    return response
}

const remove = async (blog) => {
    const uri = `${baseUrl}/${blog.id}`
    console.log(`removing ${uri}`)
    const response = await axios.delete(uri, getAuthHeaderConfig())
    return response
}

const like = async (blog) => {

    const uri = `${baseUrl}/${blog.id}`
    blog.likes += 1
    console.log(blog)
    console.log(`adding a like to ${uri}`)
    const response = await axios.put(uri, {...blog, user: blog.user.id})
    return response

}

export default { remove, like, setToken, getAll, create }
