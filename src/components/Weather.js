import React from 'react';
import moment from 'moment';
import UnitButton from './UnitButton'
import Form from './Form'
import Details from './Details'
import HourlyForecast from './HourlyForecast'
import DailyForecast from './DailyForecast'
import ForecastButton from './ForecastButton'

const Weather = () => {
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState('tokyo');
  const [units, setUnits] = React.useState('imperial');
  const [hourlyForecast, setHourlyForecast] = React.useState(false);
  const [weatherDetails, setWeatherDetails] = React.useState();
  const [hour, setHour] = React.useState(new Date().getHours());
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

  const getColorScheme = () => {
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
    setDate([currTime.format("MM/DD"), currTime.format("dddd"), currTime.format("HH:mm")])
    setHour(currTime.format("H"))
    setHourOne([currTime.add(1, 'hours').format("H"), 1])
    setHourTwo([currTime.add(1, 'hours').format("H"), 2])
    setHourThree([currTime.add(1, 'hours').format("H"), 3])
    setHourFour([currTime.add(1, 'hours').format("H"), 4])
    setHourFive([currTime.add(1, 'hours').format("H"), 5])
    setDateOne([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd"), 1])
    setDateTwo([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd"), 2])
    setDateThree([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd"), 3])
    setDateFour([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd"), 4])
    setDateFive([currTime.add(1, 'days').format("MM/DD"), currTime.format("dddd"), 5])
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

  const handleUnits = (event) => {
    event.preventDefault();
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
    <div className={"card--weather " + getColorScheme()}>
      <UnitButton
        handleUnits={handleUnits}
        units={units}
      />
      <div className="weather--info">
        <h2>Weather in</h2>
        <Form
          handleClick={handleClick}
          handleFilter={handleFilter}
          city={city}
        />
        <Details
          weatherDetails={weatherDetails}
          date={date}
        />
        <h4>{hourlyForecast ? "Hourly Forecast" : "Daily Forecast"}</h4>
        <div className={hourlyForecast ? "weather--forecast hourly" : "weather--forecast daily"}>
          <HourlyForecast
            weatherDetails={weatherDetails}
            hourOne={hourOne}
            hourTwo={hourTwo}
            hourThree={hourThree}
            hourFour={hourFour}
            hourFive={hourFive}
          />
          <DailyForecast
            weatherDetails={weatherDetails}
            dateOne={dateOne}
            dateTwo={dateTwo}
            dateThree={dateThree}
            dateFour={dateFour}
            dateFive={dateFive}
          />
        </div>
        <ForecastButton
          handleForecast={handleForecast}
          hourlyForecast={hourlyForecast}
        />
      </div>
    </div>
  )
}

export default Weather
