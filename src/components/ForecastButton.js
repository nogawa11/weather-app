const ForecastButton = ({handleForecast, hourlyForecast}) => {
  return (
    <button
      className="btn---five-day"
      onClick={handleForecast}
    >
      {hourlyForecast ? "See Daily Forecast" : "See Hourly Forecast"}
    </button>
  )
}

export default ForecastButton;
