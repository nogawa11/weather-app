const Details = ({weatherDetails, date}) => {
  return (
    <div className="weather--details">
      <img
        src={weatherDetails ? require("../icons/" + weatherDetails.current.weather[0].icon + ".png") : null}
        alt="weather"
      />
      <h1 className="weather--temp">
        {weatherDetails ? Math.ceil(weatherDetails.current.temp) + "˚": null}
      </h1>
      <div className="weather--text">
        <h3>
          {weatherDetails ? weatherDetails.current.weather[0].description : null}
        </h3>
        <p>{weatherDetails ? date[1] + " " + date[2] : null}</p>
        <p>{weatherDetails ? "Humidity: " + weatherDetails.current.humidity + "%" : null}</p>
      </div>
    </div>
  )
}

export default Details
