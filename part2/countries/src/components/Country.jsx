import WeatherService from '../services/WeatherService.jsx'
import {useState, useEffect} from 'react'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)
    const commonName = country.name.common;
    const emojiFlag = country.flag;
    const capital = country.capital;
    const area = country.area;

    const languages = Object.values(country.languages);
    const flagSvg = country.flags.svg;

    useEffect(() => {
	const capital = country.capital
	WeatherService.getCoords(capital)
	    .then((response) => {
		const [lat,lon] = response
		WeatherService.getWeather(lat,lon)
		    .then((response) => {
			setWeather(response)
		    })
	    })
    },[])
    useEffect(() => {
	if (weather === null) return
	setIcon(WeatherService.getIconUrl(weather.weather[0].icon))
    },[weather])

    const containerStyle = {
        position: 'relative',
        padding: '20px',
        height: '100%',
        overflow: 'hidden',
    };

    const contentStyle = {
	overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
        borderRadius: '15px', 
        padding: '40px',
        background: 'rgba(0, 0, 0, 0.5)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(5px)', 
        color: 'white', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', 
	height:'auto',
	width:'auto',
    };

    const backgroundStyle = {
	borderRadius: '15px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${flagSvg})`,
        backgroundSize: 'contain',
	backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: -1,
    };

    return (
        <div style={containerStyle} className="container">
	    <div style={backgroundStyle} className="background" />
            <div style={contentStyle} className="info">
                <h2>{commonName}{emojiFlag}</h2>
                <p>Capital: {capital}</p>
                <p>Area: {area} km²</p>
                <h4>Languages</h4>
                <ul>
                    {languages.map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
		<h4>Weather in {country.capital}</h4>
		{weather ?
		    <div>
		    <ul style={{listStyle: 'none', padding: '0px'}}>
			<li key="desc">{weather.weather[0].description}</li>
			<li key="temp">{weather.main.temp}°C</li>
			<li key="wind">{weather.wind.speed}m/s</li>
			<li key="icon"><img src={icon} alt="weather icon"/></li>
		    </ul>
		    </div>:
		    <p>requesting...</p>
		}
            </div>
        </div>
    );
};

export default Country;

