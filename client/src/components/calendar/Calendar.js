import React from 'react'
import PropTypes from 'prop-types'
import './Calendar.scss'
import { dayToText } from '../../constants/Date'
import { ExpenseType } from '../../constants/ExpenseType'

const Calendar = ({ yearMonth, expensesGroupedByDate }) => {
  const [year, month] = yearMonth.split('-')
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()

  return (
    <section className="calendarWrapper">
      <section className='calendar'>
        {
          Object.values(dayToText).map((dayText, index) => {
            return (
              <div key={index} className='calendar__dayOfWeek'>
                {dayText}
              </div>
            )
          })
        }
        {
          [...Array(firstDay).keys()].map((day) => {
            return (
              <div key={`empty-${day}`} name={`empty-${day}`} className='calendar__day--empty'></div>
            )
          })
        }
        {
          [...Array(daysInMonth).keys()].map((day) => {
            const dailyIncome = expensesGroupedByDate[`${year}-${month}-${String(day + 1).padStart(2, '0')}`]?.reduce((acc, cur) => {
              return cur.type === ExpenseType.income ? acc + cur.amount : acc
            }, 0) ?? 0
            const dailyExpense = expensesGroupedByDate[`${year}-${month}-${String(day + 1).padStart(2, '0')}`]?.reduce((acc, cur) => {
              return cur.type === ExpenseType.expense ? acc + cur.amount : acc
            }, 0) ?? 0

            return (
              <div key={day} name={day} className='calendar__day'>
                <span className="calendar__date">{ day + 1 }</span>
                <span className="calendar__dailyIncome">{ dailyIncome > 0 ? dailyIncome.toLocaleString() : ''}</span>
                <span className="calendar__dailyExpense">{ dailyExpense > 0 ? dailyExpense.toLocaleString() : ''}</span>
              </div>
            )
          })
        }
      </section>
    </section>
  )
}

Calendar.propTypes = {
  yearMonth: PropTypes.string.isRequired,
  expensesGroupedByDate: PropTypes.object.isRequired
}

export default Calendar
