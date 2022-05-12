const DailyForecast = ({weatherDetails, dateOne, dateTwo, dateThree, dateFour, dateFive}) => {
  const dates = [dateOne, dateTwo, dateThree, dateFour, dateFive]

  const dailyForecast = dates.map((date) => {
    return (
      <div className="weather--forecast-details">
        <p>{weatherDetails ? date[0] : null}</p>
        <p className="weather-forecast-details-day">
          {weatherDetails ? date[1] : null}
        </p>
        <img
          src={weatherDetails ? require("../icons/" + weatherDetails.daily[date[2]].weather[0].icon + ".png") : null}
          alt="weather"
        />
        <p>{weatherDetails ? weatherDetails.daily[date[2]].temp.day + "˚": null}</p>
        <div className="weather-forecast-details-range">
          <p>{weatherDetails ? "Hi: " + Math.ceil(weatherDetails.daily[date[2]].temp.max) + "˚": null}</p>
          /
          <p>{weatherDetails ? "Lo: " + Math.ceil(weatherDetails.daily[date[2]].temp.min) + "˚": null}</p>
        </div>
      </div>
    )
  })

  return (
    <div className="weather--forecast-daily">
      {dailyForecast}
    </div>
  )
}

export default DailyForecast;
