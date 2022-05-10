import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState();
  const [weatherDetails, setWeatherDetails] = React.useState();

  async function getCoordinates() {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX}`)
      const data = await response.json();
      async function getWeatherDetails(event) {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.features[0].center[1]}&lon=${data.features[0].center[0]}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API}&units=imperial`)
          const info = await res.json();
          setWeatherDetails(info)
          console.log(info)
        } catch (err) {
          setState("error")
          console.log(err)
        }
      }
      getWeatherDetails();
    } catch (err) {
      setState("error")
      console.log(err)
    }
  }

  const handleFilter = (event) => {
    event.preventDefault()
    setCity(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault();
    getCoordinates();
  }

  return (
    <div className="card--weather">
      <button className="btn--mode">
        <span className="icon--mode"><FontAwesomeIcon icon = {faMoon} /></span>
        " Dark Mode"
      </button>
      <h1>Weather in</h1>
      <form>
        <input name="city" type="text" value={city ? city : ''} onChange={handleFilter} />
        <button onClick={handleClick}>Check</button>
      </form>
    </div>
  )
}

export default Weather
