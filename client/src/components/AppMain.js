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
  const [updatingExpenseItem, setUpdatingExpenseItem] = useState(null)

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

  // Note: Every time categories context is updated, all components that consume the context will re-render.
  return (
    <section className='appMain'>
      <ExpenseContext.Provider value={{
        expensesGroupedByYearMonth,
        setExpensesGroupedByYearMonth,
        updatingExpenseItem,
        setUpdatingExpenseItem
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
          { appViewType === AppViewType.expenseForm && <ExpenseForm /> }
          { appViewType === AppViewType.calendarView && <CalendarView /> }
          { appViewType === AppViewType.menuView && <MenuView /> }
          { appViewType === AppViewType.reportView && <ReportView /> }

          { categoryListOpen && <CategoryList onClose={() => setCategoryListOpen(false)} /> }

        </CategoriesContext.Provider>
      </ExpenseContext.Provider>

    </section>
  )
}

export default AppMain
