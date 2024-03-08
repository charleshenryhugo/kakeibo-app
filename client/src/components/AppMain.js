import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './AppMain.scss'
import { AppViewType } from '../constants/AppViewType'
import ExpenseForm from './ExpenseForm'
import CalendarView from './CalendarView'
import ReportView from './ReportView'
import MenuView from './MenuView'
import { CategoriesContext } from '../contexts/CategoryContext'
import CategoryList from './category/CategoryList'

// eslint-disable-next-line react/prop-types
const CurrentAppView = ({ appViewType }) => {
  if (appViewType === AppViewType.expenseForm) {
    return <ExpenseForm onSubmit={() => {}} />
  }
  if (appViewType === AppViewType.calendarView) {
    return <CalendarView />
  }
  if (appViewType === AppViewType.menuView) {
    return <MenuView />
  }
  if (appViewType === AppViewType.reportView) {
    return <ReportView />
  }
}

const AppMain = ({ appViewType }) => {
  const [categories, setCategories] = useState([])
  const [categoryListOpen, setCategoryListOpen] = useState(false)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [updatingCategoryItem, setUpdatingCategoryItem] = useState(null)

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
        <CurrentAppView appViewType={appViewType} />
        {categoryListOpen && <CategoryList onClose={() => setCategoryListOpen(false)} />}
      </CategoriesContext.Provider>
    </section>
  )
}

AppMain.propTypes = {
  appViewType: PropTypes.number.isRequired
}

export default AppMain
