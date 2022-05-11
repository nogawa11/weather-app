import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

const Weather = () => {
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState('tokyo');
  const [weatherDetails, setWeatherDetails] = React.useState();
  const [hour, setHour] = React.useState(new Date().getHours());
  const [currentTime, setCurrentTime] = React.useState(new Date().getHours());
  const [hourOne, setHourOne] = React.useState();
  const [hourTwo, setHourTwo] = React.useState();
  const [hourThree, setHourThree] = React.useState();
  const [hourFour, setHourFour] = React.useState();
  const [hourFive, setHourFive] = React.useState();

  const getColors = () => {
    if (hour >= 7 && hour <= 17) {
      return
    } else if ((hour < 7 && hour > 4) || (hour > 17 && hour < 19)) {
      return "sunset"
    } else {
      return "night"
    }
  }

  const getHour = (offset) => {
    const offsetInMin = offset / 60
    const currTime = moment().utcOffset(offsetInMin)
    const formattedTime = currTime.format("HH:mm")
    setHour(currTime.format("H"))
    setCurrentTime(formattedTime)
    setHourOne(currTime.add(1, 'hours').format("H"))
    setHourTwo(currTime.add(1, 'hours').format("H"))
    setHourThree(currTime.add(1, 'hours').format("H"))
    setHourFour(currTime.add(1, 'hours').format("H"))
    setHourFive(currTime.add(1, 'hours').format("H"))
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
          getHour(info.timezone_offset)
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

  React.useEffect(() => {
    getCoordinates()
  }, [])


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
      <h2>Weather in</h2>
      <form className="weather--form">
        <input name="city" type="text" value={city ? city : ''} onChange={handleFilter} />
        <button className="btn--submit" onClick={handleClick}>Check</button>
      </form>
      <div className="weather--details">
        <img src={weatherDetails ? require("../icons/" + weatherDetails.current.weather[0].icon + ".png") : null} alt="weather"/>
        <h1 className="weather--temp">{weatherDetails ? Math.ceil(weatherDetails.current.temp) + "˚": null}</h1>
        <div className="weather--text">
          <h3>{weatherDetails ? weatherDetails.current.weather[0].description : null}</h3>
          <p>{weatherDetails ? "Local Time: " + currentTime : null}</p>
          <p>{weatherDetails ? "Humidity: " + weatherDetails.current.humidity + "%" : null}</p>
        </div>
      </div>
      <h4>Hourly Forecast</h4>
      <div className="weather--hourly">
        <div className="weather--hourly-details">
          <p>{weatherDetails ? hourOne + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[1].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[1].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-details">
          <p>{weatherDetails ? hourTwo + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[2].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[2].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-details">
          <p>{weatherDetails ? hourThree + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[3].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[3].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-details">
          <p>{weatherDetails ? hourFour + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[4].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[4].temp + "˚": null}</p>
        </div>
        <div className="weather--hourly-details">
          <p>{weatherDetails ? hourFive + ":00" : null}</p>
          <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[5].weather[0].icon + ".png") : null} alt="weather"/>
          <p>{weatherDetails ? weatherDetails.hourly[5].temp + "˚": null}</p>
        </div>
      </div>
      <button className="btn---five-day"> See 5-day Forecast</button>
    </div>
  )
}

export default Weather
