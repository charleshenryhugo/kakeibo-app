import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './AppMain.scss'
import { AppViewType } from '../constants/AppViewType'
import ExpenseForm from './ExpenseForm'
import CalendarView from './CalendarView'
import ReportView from './ReportView'
import MenuView from './MenuView'
import { CategoriesContext } from '../contexts/AppMainContext'

const AppMain = ({ appViewType }) => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/getCategories')
      const { result } = await response.json()

      setCategories(() => result)
    }

    fetchCategories()
  }, [])

  const onCreateExpenseItem = (expenseItem) => {
    // add expense locally
  }

  // eslint-disable-next-line react/prop-types
  const CurrentAppView = ({ appViewType }) => {
    if (appViewType === AppViewType.expenseForm) {
      return <ExpenseForm onSubmit={onCreateExpenseItem} onCanceled={() => {}} />
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

  return (
    <section className='appMain'>
      <CategoriesContext.Provider value={{ categories, setCategories }}>
        <CurrentAppView appViewType={appViewType} />
      </CategoriesContext.Provider>
    </section>
  )
}

AppMain.propTypes = {
  appViewType: PropTypes.number.isRequired
}

export default AppMain
