import React, { useState, useEffect, useContext } from 'react'
import './CalendarView.scss'
import ExpensesList from './ExpensesList'
import YearMonthSelector from './calendar/YearMonthSelector'
import Calendar from './calendar/Calendar'
import StickyTop from './UI/Sticky'
import dayjs from 'dayjs'
import { ExpenseContext } from '../contexts/ExpenseContext'

const CalendarView = () => {
  const today = new Date()
  const [yearMonth, setYearMonth] = useState(dayjs().format('YYYY-MM'))
  const [expenses, setExpenses] = useState([])
  const [calendarClickedDay, setCalendarClickedDay] = useState(today.getDate()) // controls expense list scroll

  const { expensesGroupedByYearMonth, setExpensesGroupedByYearMonth } = useContext(ExpenseContext)

  const updateExpensesContext = (monthlyExpenses) => {
    setExpenses(() => monthlyExpenses)

    const groupedByDate = monthlyExpenses.reduce((acc, cur) => {
      const date = cur.inputDate
      if (acc[date]) {
        acc[date].push(cur)
      } else {
        acc[date] = [cur]
      }
      return acc
    }, {})

    const month = monthlyExpenses[0]?.inputDate.slice(0, 7)
    if (month) {
      setExpensesGroupedByYearMonth((prev) => {
        return { ...prev, [month]: groupedByDate }
      })
    }
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      const [year, month] = yearMonth.split('-')
      const response = await fetch('/api/getMonthlyExpenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ year, month })
      })

      const { result: monthlyExpenses } = await response.json()

      updateExpensesContext(monthlyExpenses)
    }

    if (yearMonth === dayjs().format('YYYY-MM')) {
      setCalendarClickedDay(dayjs().date())
    } else {
      setCalendarClickedDay(-1)
    }

    if (!expensesGroupedByYearMonth[yearMonth]) {
      fetchExpenses()
    }
    // this effect should only run when yearMonth changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearMonth])

  const onUpdateFormSubmit = (updatedExpenseItem) => {
    const newExpenses = expenses.map((expense) => {
      return expense.id === updatedExpenseItem.id ? { ...updatedExpenseItem } : expense
    })

    updateExpensesContext(newExpenses)
  }

  const onExpenseItemDeleted = (deletedExpenseItem) => {
    const newExpenses = expenses.filter((expense) => {
      return expense.id !== deletedExpenseItem.id
    })

    updateExpensesContext(newExpenses)
  }

  return (
    <section className="calendarViewWrapper">
      <StickyTop top='0' width='100%' backgroundColor='#ffffff'>
        <YearMonthSelector yearMonth={yearMonth} setYearMonth={setYearMonth} />
        <Calendar
          yearMonth={yearMonth}
          expensesGroupedByDate={expensesGroupedByYearMonth[yearMonth] ?? {}}
          clickedDay={calendarClickedDay}
          setClickedDay={setCalendarClickedDay}
        />
      </StickyTop>
      <ExpensesList
        expenses={expenses}
        expensesGroupedByDate={expensesGroupedByYearMonth[yearMonth] ?? {}}
        onUpdateFormSubmit={onUpdateFormSubmit}
        onItemDelete={onExpenseItemDeleted}
        calendarClickedDay={calendarClickedDay}
      />
    </section>
  )
}

export default CalendarView
