import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

const Weather = () => {
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState('tokyo');
  const [units, setUnits] = React.useState('imperial');
  const [hourlyForecast, setHourlyForecast] = React.useState(true);
  const [weatherDetails, setWeatherDetails] = React.useState();
  const [hour, setHour] = React.useState(new Date().getHours());
  const [currentTime, setCurrentTime] = React.useState();
  const [hourOne, setHourOne] = React.useState();
  const [hourTwo, setHourTwo] = React.useState();
  const [hourThree, setHourThree] = React.useState();
  const [hourFour, setHourFour] = React.useState();
  const [hourFive, setHourFive] = React.useState();
  const [date, setDate] = React.useState();
  const [dateOne, setDateOne] = React.useState();
  const [dateTwo, setDateTwo] = React.useState();
  const [dateThree, setDateThree] = React.useState();
  const [dateFour, setDateFour] = React.useState();
  const [dateFive, setDateFive] = React.useState();


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
    setDate([currTime.format("MM/DD"), currTime.format("dddd")])
    setCurrentTime(formattedTime)
    setHour(currTime.format("H"))
    setHourOne(currTime.add(1, 'hours').format("H"))
    setHourTwo(currTime.add(1, 'hours').format("H"))
    setHourThree(currTime.add(1, 'hours').format("H"))
    setHourFour(currTime.add(1, 'hours').format("H"))
    setHourFive(currTime.add(1, 'hours').format("H"))
    setDateOne([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd")])
    setDateTwo([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd")])
    setDateThree([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd")])
    setDateFour([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd")])
    setDateFive([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd")])
  }

  async function getCoordinates() {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.REACT_APP_MAPBOX}`)
      const data = await response.json();
      async function getWeatherDetails(event) {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.features[0].center[1]}&lon=${data.features[0].center[0]}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API}&units=${units}`)
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
  }, [units])


  const handleFilter = (event) => {
    event.preventDefault()
    setCity(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault();
    getCoordinates();
  }

  const changeUnits = (event) => {
    if (event.target.innerText === "C˚") {
      setUnits("metric")
    } else if (event.target.innerText === "F˚") {
      setUnits("imperial")
    }
  }

  const handleForecast = (event) => {
    event.preventDefault()
    setHourlyForecast(prevState => !prevState)
  }

  return (
    <div className={"card--weather " + getColors()}>
      <div className="weather--units">
        <button className={units === "metric" ? "selected" : null} onClick={changeUnits}>C˚</button>
        /
        <button className={units === "imperial" ? "selected" : null} onClick={changeUnits}>F˚</button>
      </div>
      <div className="weather--info">
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
            <p>{weatherDetails ? date[0] + " (" + date[1] + ")" : null}</p>
            <p>{weatherDetails ? "Humidity: " + weatherDetails.current.humidity + "%" : null}</p>
          </div>
        </div>
        <h4>{hourlyForecast ? "Hourly Forecast" : "Daily Forecast"}</h4>
        <div className={hourlyForecast ? "weather--forecast hourly" : "weather--forecast daily"}>
          <div className="weather--forecast-hourly">
            <div className="weather--forecast-details">
              <p>{weatherDetails ? hourOne + ":00" : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[1].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.hourly[1].temp + "˚": null}</p>
            </div>
            <div className="weather--forecast-details">
              <p>{weatherDetails ? hourTwo + ":00" : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[2].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.hourly[2].temp + "˚": null}</p>
            </div>
            <div className="weather--forecast-details">
              <p>{weatherDetails ? hourThree + ":00" : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[3].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.hourly[3].temp + "˚": null}</p>
            </div>
            <div className="weather--forecast-details">
              <p>{weatherDetails ? hourFour + ":00" : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[4].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.hourly[4].temp + "˚": null}</p>
            </div>
            <div className="weather--forecast-details">
              <p>{weatherDetails ? hourFive + ":00" : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.hourly[5].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.hourly[5].temp + "˚": null}</p>
            </div>
          </div>
          <div className="weather--forecast-daily">
            <div className="weather--forecast-details">
              <p>{weatherDetails ? dateOne[0] : null}</p>
              <p className="weather-forecast-details-day">{weatherDetails ? dateOne[1] : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.daily[1].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.daily[1].temp.day + "˚": null}</p>
              <div className="weather-forecast-details-range">
                <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[1].temp.max) + "˚": null}</p>
                /
                <p> {weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[1].temp.min) + "˚": null}</p>
              </div>
            </div>
            <div className="weather--forecast-details">
            <p>{weatherDetails ? dateTwo[0] : null}</p>
              <p className="weather-forecast-details-day">{weatherDetails ? dateTwo[1] : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.daily[2].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.daily[2].temp.day + "˚": null}</p>
              <div className="weather-forecast-details-range">
                <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[2].temp.max) + "˚": null}</p>
                /
                <p> {weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[2].temp.min) + "˚": null}</p>
              </div>
            </div>
            <div className="weather--forecast-details">
            <p>{weatherDetails ? dateThree[0] : null}</p>
              <p className="weather-forecast-details-day">{weatherDetails ? dateThree[1] : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.daily[3].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.daily[3].temp.day + "˚": null}</p>
              <div className="weather-forecast-details-range">
                <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[3].temp.max) + "˚": null}</p>
                /
                <p> {weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[3].temp.min) + "˚": null}</p>
              </div>
            </div>
            <div className="weather--forecast-details">
            <p>{weatherDetails ? dateFour[0] : null}</p>
              <p className="weather-forecast-details-day">{weatherDetails ? dateFour[1] : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.daily[4].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.daily[4].temp.day + "˚": null}</p>
              <div className="weather-forecast-details-range">
                <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[4].temp.max) + "˚": null}</p>
                /
                <p> {weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[4].temp.min) + "˚": null}</p>
              </div>
            </div>
            <div className="weather--forecast-details">
              <p>{weatherDetails ? dateFive[0] : null}</p>
              <p className="weather-forecast-details-day">{weatherDetails ? dateFive[1] : null}</p>
              <img src={weatherDetails ? require("../icons/" + weatherDetails.daily[5].weather[0].icon + ".png") : null} alt="weather"/>
              <p>{weatherDetails ? weatherDetails.daily[5].temp.day + "˚": null}</p>
              <div className="weather-forecast-details-range">
                <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[5].temp.max) + "˚": null}</p>
                /
                <p> {weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[5].temp.min) + "˚": null}</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn---five-day" onClick={handleForecast}> {hourlyForecast ? "See 5-day Forecast" : "See Hourly Forecast"}</button>
      </div>
    </div>
  )
}

export default Weather
