import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import './ExpensesList.scss'
import { ExpenseType } from '../constants/ExpenseType'
import dayjs from 'dayjs'
import { dayToText } from '../constants/Date'
import UpdateExpenseForm from './UpdateExpenseForm'
import RightArrow from './Icon/RightArrow'
import { CategoriesContext } from '../contexts/AppMainContext'

const ExpensesList = ({ expenses, expensesGroupedByDate, onUpdateFormSubmit, onItemDelete }) => {
  const { categories } = useContext(CategoriesContext)
  const categoryMap = categories.reduce((acc, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})

  const expenseTotal = expenses.reduce((acc, cur) => {
    return cur.type === ExpenseType.expense ? acc + cur.amount : acc
  }, 0)

  const incomeTotal = expenses.reduce((acc, cur) => {
    return cur.type === ExpenseType.income ? acc + cur.amount : acc
  }, 0)

  const [selectedExpenseItem, setSelectExpenseItem] = useState(null)
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

  const onExpenseItemClick = (expenseItem) => {
    setSelectExpenseItem(() => expenseItem)
    setIsUpdateFormOpen(true)
  }

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false)
    setSelectExpenseItem(null)
  }

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
          Object.keys(expensesGroupedByDate).sort((date1, date2) => date2.localeCompare(date1)).map((date, index) => {
            return (
              <div key={index} id={`${date}`}>
                <div className='expensesList__dailyTotal'>
                  <div className='expensesList__dailyTotalAmount'>{ `${dayjs(date).format('YYYY年MM月DD日')}(${dayToText[dayjs(date).day()]})` }</div>
                  <div className='expensesList__dailyTotalAmount'>{
                    expensesGroupedByDate[date].reduce((acc, cur) => {
                      return cur.type === ExpenseType.expense ? acc - cur.amount : acc + cur.amount
                    }, 0).toLocaleString()
                  }円
                  </div>
                </div>
                {
                  expensesGroupedByDate[date].map((expense, index) => {
                    return (
                      <div key={index} className='expensesList__expenseItem' onClick={() => onExpenseItemClick(expense)}>
                        <div>{categoryMap[expense.categoryId]?.text ?? ''} ({expense.title})</div>
                        <div className={`expensesList__expenseAmount ${expense.type === ExpenseType.income ? 'income' : ''}`}>
                          <span>{Number(expense.amount).toLocaleString()}円</span>
                          <RightArrow width='12px' height='12px' />
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
      {isUpdateFormOpen
        ? <UpdateExpenseForm
            expenseItem={selectedExpenseItem}
            onSubmit={(updatedExpenseItem) => { closeUpdateForm(); onUpdateFormSubmit(updatedExpenseItem) }}
            onCancel={() => closeUpdateForm()}
            onItemDelete={(deletedExpenseItem) => { closeUpdateForm(); onItemDelete(deletedExpenseItem) } }
          />
        : ''}
    </section>
  )
}

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
  expensesGroupedByDate: PropTypes.object.isRequired,
  onUpdateFormSubmit: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired
}

export default ExpensesList
