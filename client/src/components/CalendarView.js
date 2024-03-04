import React, { useState, useEffect } from 'react'
import './CalendarView.scss'
import ExpensesList from './ExpensesList'
import YearMonthSelector from './calendar/YearMonthSelector'
import Calendar from './calendar/Calendar'

const CalendarView = () => {
  const today = new Date()
  const [yearMonth, setYearMonth] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`)
  const [expenses, setExpenses] = useState([])
  const [expensesGroupedByDate, setExpensesGroupedByDate] = useState({})

  const updateExpenses = (newExpenses) => {
    setExpenses(() => newExpenses)

    setExpensesGroupedByDate(() => {
      return newExpenses.reduce((acc, cur) => {
        const date = cur.inputDate
        if (acc[date]) {
          acc[date].push(cur)
        } else {
          acc[date] = [cur]
        }
        return acc
      }, {})
    })
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

      const { result } = await response.json()

      updateExpenses(result)
    }

    fetchExpenses()
  }, [yearMonth])

  const onUpdateFormSubmit = (updatedExpenseItem) => {
    const newExpenses = expenses.map((expense) => {
      return expense.id === updatedExpenseItem.id ? { ...updatedExpenseItem } : expense
    })

    updateExpenses(newExpenses)
  }

  const onExpenseItemDeleted = (deletedExpenseItem) => {
    const newExpenses = expenses.filter((expense) => {
      return expense.id !== deletedExpenseItem.id
    })

    updateExpenses(newExpenses)
  }

  return (
    <section className="calendarViewWrapper">
      <YearMonthSelector yearMonth={yearMonth} setYearMonth={setYearMonth} />
      <Calendar yearMonth={yearMonth} expensesGroupedByDate={expensesGroupedByDate}/>
      <ExpensesList
        expenses={expenses}
        expensesGroupedByDate={expensesGroupedByDate}
        onUpdateFormSubmit={onUpdateFormSubmit}
        onItemDelete={onExpenseItemDeleted}
      />
    </section>
  )
}

export default CalendarView
