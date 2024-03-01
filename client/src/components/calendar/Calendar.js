import React from 'react'
import PropTypes from 'prop-types'
import './Calendar.scss'
import { dayToText } from '../../constants/Date'

const Calendar = ({ yearMonth }) => {
  const [year, month] = yearMonth.split('-')
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()

  return (
    <section className="calendarWrapper">
      <section className='calendar'>
        {
          Object.values(dayToText).map((day) => {
            return (
              <div key={day} className='calendar__dayOfWeek'>
                {day}
              </div>
            )
          })
        }
        {
          [...Array(firstDay).keys()].map((day) => {
            return (
              <div key={`empty-${day}`} className='calendar__day--empty'>
              </div>
            )
          })
        }
        {
          [...Array(daysInMonth).keys()].map((day) => {
            return (
              <div key={day} className='calendar__day'>
                {day + 1}
              </div>
            )
          })
        }
      </section>
    </section>
  )
}

Calendar.propTypes = {
  yearMonth: PropTypes.string.isRequired
}

export default Calendar
