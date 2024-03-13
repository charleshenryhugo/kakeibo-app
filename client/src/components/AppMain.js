import React, { useContext, useEffect, useState } from 'react'
import './AppMain.scss'
import { AppViewType } from '../constants/AppViewType'
import ExpenseForm from './ExpenseForm'
import CalendarView from './CalendarView'
import ReportView from './ReportView'
import MenuView from './MenuView'
import { CategoriesContext } from '../contexts/CategoryContext'
import { AppMainContext } from '../contexts/AppMainContext'
import { ExpenseContext } from '../contexts/ExpenseContext'
import CategoryList from './category/CategoryList'

const AppMain = () => {
  const [expensesGroupedByYearMonth, setExpensesGroupedByYearMonth] = useState({})

  const [categories, setCategories] = useState([])
  const [categoryListOpen, setCategoryListOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [updatingCategoryItem, setUpdatingCategoryItem] = useState(null)

  const { appViewType } = useContext(AppMainContext)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/getCategories')
      const { result } = await response.json()

      setCategories(() => result.sort((item1, item2) => item1.order - item2.order))
    }

    fetchCategories()
  }, [])

  const onNewExpenseSubmit = (expenseItem) => {
    setExpensesGroupedByYearMonth((prev) => {
      const yearMonth = `${expenseItem.year}-${expenseItem.month.toString().padStart(2, '0')}`
      if (prev[yearMonth]) {
        prev[yearMonth][expenseItem.inputDate] = prev[yearMonth][expenseItem.inputDate] ? [...prev[yearMonth][expenseItem.inputDate], expenseItem] : [expenseItem]
      } else {
        prev[yearMonth] = { [expenseItem.inputDate]: [expenseItem] }
      }
      return { ...prev }
    })
  }

  /* Note: Every time categories context is updated, all components that consume the context will re-render. */
  return (
    <main className='appMain'>
      <ExpenseContext.Provider value={{
        expensesGroupedByYearMonth,
        setExpensesGroupedByYearMonth
      }}>
        <CategoriesContext.Provider
          value={{
            categories,
            setCategories,
            categoryListOpen,
            setCategoryListOpen,
            categoryFormOpen,
            setCategoryFormOpen,
            updatingCategoryItem,
            setUpdatingCategoryItem
          }}
        >
          {/* note: when appViewType changes, the components will un-mount/re-mount and lose state */}
          { appViewType === AppViewType.expenseForm && <ExpenseForm onSubmit={onNewExpenseSubmit} /> }
          { appViewType === AppViewType.calendarView && <CalendarView /> }
          { appViewType === AppViewType.menuView && <MenuView /> }
          { appViewType === AppViewType.reportView && <ReportView /> }

          { categoryListOpen && <CategoryList onClose={() => setCategoryListOpen(false)} /> }

        </CategoriesContext.Provider>
      </ExpenseContext.Provider>

    </main>
  )
}

export default AppMain
