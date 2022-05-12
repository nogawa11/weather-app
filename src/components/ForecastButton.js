const ForecastButton = ({handleForecast, hourlyForecast}) => {
  return (
    <button
      className="btn---five-day"
      onClick={handleForecast}
    >
      {hourlyForecast ? "See 5-day Forecast" : "See Hourly Forecast"}
    </button>
  )
}

export default ForecastButton;
