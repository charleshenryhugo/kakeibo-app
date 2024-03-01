import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './ExpensesList.scss'
import { ExpenseType } from '../constants/ExpenseType'
import dayjs from 'dayjs'
import { dayToText } from '../constants/Date'

const ExpensesList = ({ yearMonth }) => {
  const [expenses, setExpenses] = useState({})
  const [expenseTotal, setExpenseTotal] = useState(0)
  const [incomeTotal, setIncomeTotal] = useState(0)

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

      const expenseTotal = result.reduce((acc, cur) => {
        return cur.type === ExpenseType.expense ? acc + cur.amount : acc
      }, 0)

      const incomeTotal = result.reduce((acc, cur) => {
        return cur.type === ExpenseType.income ? acc + cur.amount : acc
      }, 0)

      setExpenses(() => expensesGroupedByDate)
      setExpenseTotal(expenseTotal)
      setIncomeTotal(incomeTotal)
    }

    updateExpenses()
  }, [yearMonth])

  return (
    <section className="expensesListWrapper">
      <div className='expensesList'>
        <div className='expensesList__monthlyTotal'>
          <div className='expensesList__monthlyTotalItem'>
            <span className='expensesList__monthlyTotalItemTitle'>収入</span>
            <span className='expensesList__monthlyTotalItem--income'>{incomeTotal.toLocaleString()}円</span>
          </div>
          <div className='expensesList__monthlyTotalItem'>
            <span className='expensesList__monthlyTotalItemTitle'>支出</span>
            <span className='expensesList__monthlyTotalItem--expense'>{expenseTotal.toLocaleString()}円</span>
          </div>
          <div className='expensesList__monthlyTotalItem'>
            <span className='expensesList__monthlyTotalItemTitle'>合計</span>
            <span className={incomeTotal - expenseTotal >= 0 ? 'expensesList__monthlyTotalItem--income' : 'expensesList__monthlyTotalItem--expense'}>
              {incomeTotal - expenseTotal > 0 ? '+' : ''}{(incomeTotal - expenseTotal).toLocaleString()}円
            </span>
          </div>
        </div>
        {
          Object.keys(expenses).map((date, index) => {
            return (
              <div key={index} id={`${date}`}>
                <div className='expensesList__dailyTotal'>
                  <div className='expensesList__dailyTotalAmount'>{ `${dayjs(date).format('YYYY年MM月DD日')}(${dayToText[dayjs(date).day()]})` }</div>
                  <div className='expensesList__dailyTotalAmount'>{
                    expenses[date].reduce((acc, cur) => {
                      return cur.type === ExpenseType.expense ? acc - cur.amount : acc + cur.amount
                    }, 0).toLocaleString()
                  }円
                  </div>
                </div>
                {
                  expenses[date].map((expense, index) => {
                    return (
                      <div key={index} className='expensesList__expenseItem'>
                        <div>{expense.categoryId} ({expense.title})</div>
                        <div className={`expensesList__expenseAmount ${expense.type === ExpenseType.income ? 'income' : ''}`}>
                          {Number(expense.amount).toLocaleString()}円
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
