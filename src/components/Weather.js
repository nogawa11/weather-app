import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [city, setCity] = React.useState();

  const handleFilter = (event) => {
    setCity(event.target.value)
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
      </form>
    </div>
  )
}

export default Weather
