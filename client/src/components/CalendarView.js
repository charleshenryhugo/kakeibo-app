import React, { useState } from 'react'
import './CalendarView.scss'
import ExpensesList from './ExpensesList'
import YearMonthSelector from './calendar/YearMonthSelector'
import Calendar from './calendar/Calendar'

const CalendarView = () => {
  const today = new Date()
  const [yearMonth, setYearMonth] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)

  return (
    <section className="calendarViewWrapper">
      <YearMonthSelector yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <Calendar yearMonth={yearMonth} />
      <ExpensesList yearMonth={yearMonth} />
    </section>
  )
}

export default CalendarView
