import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './ExpensesList.scss'
import { ExpenseType } from '../constants/ExpenseType'

const ExpensesList = ({ yearMonth }) => {
  const [expenses, setExpenses] = useState({})

  useEffect(() => {
    const updateExpenses = async () => {
      const [year, month] = yearMonth.split('-')
      const response = await fetch('/api/getMonthlyExpenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ year, month })
      })

      const { result } = await response.json()
      const expensesGroupedByDate = result.reduce((acc, cur) => {
        const date = cur.inputDate
        if (acc[date]) {
          acc[date].push(cur)
        } else {
          acc[date] = [cur]
        }
        return acc
      }, {})

      setExpenses(() => expensesGroupedByDate)
    }

    updateExpenses()
  }, [yearMonth])

  return (
    <section className="expensesListWrapper">
      <div className='expensesList'>
        <div className='expensesList__monthlyTotal'></div>
        {
          Object.keys(expenses).map((date, index) => {
            return (
              <div key={index} className='expensesList__dailyTotal'>
                <div className='expensesList__expenseDate'>{date}</div>
                {
                  expenses[date].map((expense, index) => {
                    return (
                      <div key={index} className='expensesList__expenseItem'>
                        <div>{expense.title}</div>
                        <div className={`expensesList__expenseAmount ${expense.type === ExpenseType.income ? 'income' : ''}`}>
                          {expense.amount}円
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

ExpensesList.propTypes = {
  yearMonth: PropTypes.string.isRequired // 2024-02
}

export default ExpensesList
