import React from 'react';

const Weather = () => {
  const [city, setCity] = React.useState();

  const handleFilter = (event) => {
    setCity(event.target.value)
  }

  return (
    <div className="card--weather">
      <h1>Weather in</h1>
      <form>
        <input name="city" type="text" value={city ? city : ''} onChange={handleFilter} />
      </form>
    </div>
  )
}

export default Weather
