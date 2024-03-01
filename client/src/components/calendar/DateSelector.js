import React from 'react'
import PropTypes from 'prop-types'
import './DateSelector.scss'
import LeftArrow from '../Icon/LeftArrow'
import RightArrow from '../Icon/RightArrow'

const DateSelector = ({ date, setDate, ...props }) => {
  const adjustDate = (yearMonthDay, offset) => {
    const date = new Date(yearMonthDay)
    date.setDate(date.getDate() + offset)
    const adjustedYear = date.getFullYear()
    const adjustedMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    const adjustedDay = date.getDate().toString().padStart(2, '0')
    return `${adjustedYear}-${adjustedMonth}-${adjustedDay}`
  }

  return (
    <section className={`dateSelector ${props.className}`}>
      <span className="dateSelector__prev" onClick={() => setDate((prev) => adjustDate(prev, -1))}>
        <LeftArrow />
      </span>
      <input
        id={props.id}
        className='dateSelector__input'
        type='date'
        min='2000-01-01'
        max='2099-12-31'
        value={date} /* 2 way binding */
        onChange={(event) => setDate(event.target.value)}
      />
      <span className="dateSelector__next" onClick={() => setDate((prev) => adjustDate(prev, 1))}>
        <RightArrow />
      </span>
    </section>
  )
}

DateSelector.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  props: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string
}

export default DateSelector
