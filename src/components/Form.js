const Form = ({handleFilter, handleClick, city}) => {
  return (
    <form className="weather--form">
      <input
        name="city"
        type="text"
        value={city ? city : ''}
        onChange={handleFilter}
      />
      <button
        className="btn--submit"
        onClick={handleClick}
      >
          Check
      </button>
    </form>
  )
}

export default Form;
