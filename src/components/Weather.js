import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Weather = () => {
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState();
  const [weatherDetails, setWeatherDetails] = React.useState();
  const time = new Date();
  const hour = time.getHours();

  const getColors = () => {
    if (hour >= 7 && hour <= 17) {
      return
    } else if ((hour < 7 && hour > 4) || (hour > 17 && hour < 19)) {
      return "sunset"
    } else {
      return "night"
    }
  }

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
    <div className={"card--weather " + getColors()}>
      <h1>Weather in</h1>
      <form>
        <input name="city" type="text" value={city ? city : ''} onChange={handleFilter} />
        <button onClick={handleClick}>Check</button>
      </form>
      <div className="weather--details">
        <img src={weatherDetails ? require("../icons/" + weatherDetails.current.weather[0].icon + ".png") : null} alt="weather"/>
        <h1>{weatherDetails ? weatherDetails.current.temp + "˚": null}</h1>
        <h3>{weatherDetails ? weatherDetails.current.weather[0].description : null}</h3>
        <p>{weatherDetails ? new Date(weatherDetails.current.dt * 1000).toLocaleString() : null}</p>
        <p>{weatherDetails ? "Humidity: " + weatherDetails.current.humidity + "%" : null}</p>
        <p>{weatherDetails ? "Wind Speed: " + weatherDetails.current.wind_speed + " mph" : null}</p>
      </div>
      <div className="weather--hourly">
        <div className="weather--hourly-one">
          <p>{weatherDetails ? new Date(weatherDetails.hourly[1].dt * 1000).getHours() + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[1].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[1].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-two">
          <p>{weatherDetails ? new Date(weatherDetails.hourly[2].dt * 1000).getHours() + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[2].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[2].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-three">
          <p>{weatherDetails ? new Date(weatherDetails.hourly[3].dt * 1000).getHours() + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[3].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[3].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-four">
          <p>{weatherDetails ? new Date(weatherDetails.hourly[4].dt * 1000).getHours() + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[4].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[4].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-five">
          <p>{weatherDetails ? new Date(weatherDetails.hourly[5].dt * 1000).getHours() + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[5].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[5].temp + "˚": null}</p>
        </div>
      </div>
    </div>
  )
}

export default Weather
