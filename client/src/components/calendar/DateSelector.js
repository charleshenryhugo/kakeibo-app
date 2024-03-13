import React from 'react'
import PropTypes from 'prop-types'
import './DateSelector.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const DateSelector = ({ date, setDate, minDate = '2000-01-01', maxDate = '2099-12-31', ...props }) => {
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
        <IoIosArrowBack size='3rem' />
      </span>
      <input
        id={props.id}
        className='dateSelector__input'
        type='date'
        min={minDate}
        max={maxDate}
        value={date} /* 2 way binding */
        onChange={(event) => setDate(event.target.value)}
      />
      <span className="dateSelector__next" onClick={() => setDate((prev) => adjustDate(prev, 1))}>
        <IoIosArrowForward size='3rem'/>
      </span>
    </section>
  )
}

DateSelector.propTypes = {
  date: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  props: PropTypes.object,
  id: PropTypes.string,
  className: PropTypes.string
}

export default DateSelector
