import React from 'react'
import PropTypes from 'prop-types'
import './YearMonthSelector.scss'
import LeftArrow from '../Icon/LeftArrow'
import RightArrow from '../Icon/RightArrow'

const YearMonthSelector = ({ yearMonth, setYearMonth }) => {
  const adjustYearMonth = (yearMonth, offset) => {
    const [year, month] = yearMonth.split('-')
    const date = new Date(year, month - 1)
    date.setMonth(date.getMonth() + offset)
    const adjustedYear = date.getFullYear()
    const adjustedMonth = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${adjustedYear}-${adjustedMonth}`
  }

  return (
    <section className="yearMonthSelector">
      <span className="yearMonthSelector__prev" onClick={() => setYearMonth((prev) => adjustYearMonth(prev, -1))}>
        <LeftArrow />
      </span>
      <input
        type='month'
        className="yearMonthSelector__input"
        min='2000-01'
        max='2099-12'
        value={yearMonth}
        onChange={(event) => setYearMonth(event.target.value)}
      />
      <span className="yearMonthSelector__next" onClick={() => setYearMonth((prev) => adjustYearMonth(prev, 1))}>
        <RightArrow />
      </span>
    </section>
  )
}

YearMonthSelector.propTypes = {
  yearMonth: PropTypes.string.isRequired,
  setYearMonth: PropTypes.func.isRequired
}

export default YearMonthSelector
