import axios from 'axios'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const iconUrl = 'https://openweathermap.org/img/wn'
const geoUrl = 'http://api.openweathermap.org/geo/1.0'

const apiKey = import.meta.env.VITE_API_KEY
if (apiKey === undefined) alert("Set openweathermap api-key as VITE_API_KEY in .env")

const getWeather = (lat,lon) => {
    console.log(`requesting weather for ${[lat,lon]}`)
  const request = axios.get(`${weatherUrl}/?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
  return request.then(response => response.data)
}
const getCoords = (placeName) => {
    console.log(`requesting lat and lon for ${placeName}`)
    const request = axios.get(`${geoUrl}/direct?q=${placeName}&limit=1&appid=${apiKey}`)
    return request.then(response =>[response.data[0].lat,response.data[0].lon])
}

const getIconUrl = (code) => {
    return`${iconUrl}/${code}@4x.png`
}

export default {getWeather, getCoords, getIconUrl}
