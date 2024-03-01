import React from 'react'
import PropTypes from 'prop-types'
import './Calendar.scss'

const Calendar = ({ yearMonth }) => {
  return (
    <section className="calendarWrapper">calendar</section>
  )
}

Calendar.propTypes = {
  yearMonth: PropTypes.string.isRequired
}

export default Calendar
