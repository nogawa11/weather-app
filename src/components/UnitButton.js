const UnitButton = ({handleUnits, units}) => {
  return (
    <div className="weather--units">
      <button
        className={units === "metric" ? "selected" : null}
        onClick={handleUnits}
      >
        C˚
      </button>
      /
      <button
        className={units === "imperial" ? "selected" : null}
        onClick={handleUnits}
      >
        F˚
      </button>
    </div>
  )
}

export default UnitButton;
