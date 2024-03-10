import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './ExpensesList.scss'
import { ExpenseType } from '../constants/ExpenseType'
import dayjs from 'dayjs'
import { dayToText } from '../constants/Date'
import RightArrow from './Icon/RightArrow'
import { CategoriesContext } from '../contexts/CategoryContext'
import Icon from './UI/Icon'
import UpdateExpenseForm from './UpdateExpenseForm'

const ExpensesList = ({ expensesGroupedByDate, onUpdateFormSubmit, onItemDelete, calendarClickedDay = null }) => {
  const { categories } = useContext(CategoriesContext)
  const categoryMap = categories.reduce((acc, cur) => {
    acc[cur.id] = cur
    return acc
  }, {})

  const expenses = Object.values(expensesGroupedByDate).flat()

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

  const getExpenseGroupId = (date) => `expensesGroup${Number(date.split('-')[2])}`
  useEffect(() => {
    if (calendarClickedDay === null) {
      return
    }
    const target = document.getElementById(`expensesGroup${calendarClickedDay}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [calendarClickedDay])

  return (
    <section className="expensesListWrapper">
      <div id='expensesList' className='expensesList'>
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
              <div key={index} id={getExpenseGroupId(date)}>
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
                    const category = categoryMap[expense.categoryId]
                    return (
                      <div key={index} className='expensesList__expenseItem' onClick={() => onExpenseItemClick(expense)}>
                        <div className='expensesList__expenseTitle'>
                          { category && <Icon name={category.iconName} fill={category.iconColor} width='2rem' height='2rem' /> }
                          { category?.text ?? '' } ({expense.title})
                        </div>
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
      {isUpdateFormOpen &&
          <UpdateExpenseForm
            updatingExpenseItem={selectedExpenseItem}
            onSubmit={(updatedExpenseItem) => { closeUpdateForm(); onUpdateFormSubmit(updatedExpenseItem) }}
            onCancel={() => closeUpdateForm()}
            onItemDelete={(deletedExpenseItem) => { closeUpdateForm(); onItemDelete(deletedExpenseItem) } }
          />
      }
    </section>
  )
}

ExpensesList.propTypes = {
  expensesGroupedByDate: PropTypes.object.isRequired,
  onUpdateFormSubmit: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  calendarClickedDay: PropTypes.number
}

export default ExpensesList
