import axios from 'axios'
import {useState} from 'react'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



export default { getAll }
