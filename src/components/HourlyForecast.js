const HourlyForecast = ({weatherDetails, hourOne, hourTwo, hourThree, hourFour, hourFive}) => {
  const hours = [hourOne, hourTwo, hourThree, hourFour, hourFive]

  const hourlyForecast = hours.map((hour) => {
    return (
      <div className="weather--forecast-details">
        <p>{weatherDetails ? hour[0] + ":00" : null}</p>
        <img
          src={weatherDetails ? require("../icons/" + weatherDetails.hourly[hour[1]].weather[0].icon + ".png") : null}
          alt="weather"
        />
        <p>{weatherDetails ? weatherDetails.hourly[hour[1]].temp + "˚": null}</p>
        <p className="weather--forecast-details-description">{weatherDetails ? weatherDetails.hourly[hour[1]].weather[0].description : null}</p>
      </div>
    )
  })

  return (
    <div className="weather--forecast-hourly">
      {hourlyForecast}
    </div>
  )
}

export default HourlyForecast;
