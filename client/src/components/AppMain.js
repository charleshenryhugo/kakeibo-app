import React from 'react'
import PropTypes from 'prop-types'
import './AppMain.scss'
import { AppViewType } from '../constants/AppViewType'
import ExpenseForm from './ExpenseForm'
import CalendarView from './CalendarView'
import ReportView from './ReportView'
import MenuView from './MenuView'

const AppMain = ({ appViewType }) => {
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
      <CurrentAppView appViewType={appViewType} />
    </section>
  )
}

AppMain.propTypes = {
  appViewType: PropTypes.number.isRequired
}

export default AppMain
