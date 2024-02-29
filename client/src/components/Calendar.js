import React, { useState } from 'react'
import './Calendar.scss'
import ExpensesList from './ExpensesList'

const Calendar = () => {
  const today = new Date()
  const [yearMonth, setYearMonth] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)

  return (
    <section className="calendarWrapper">
      <input
        type='month'
        min='2000-01'
        max='2099-12'
        value={yearMonth} /* 2 way binding */
        onChange={(event) => setYearMonth(event.target.value)}
      />
      <div className='calendar'></div>
      <ExpensesList yearMonth={yearMonth} />
    </section>
  )
}

export default Calendar
