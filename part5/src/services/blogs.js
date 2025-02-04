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
    const response = axios.post(baseUrl, body, getAuthHeaderConfig())
    return response
}

export default { setToken, getAll, create }
