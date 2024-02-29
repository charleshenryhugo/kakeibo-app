import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './AppMain.scss'
import { AppViewType } from '../constants/AppViewType'
import ExpenseForm from './ExpenseForm'
import Calendar from './Calendar'
import Report from './Report'
import Menu from './Menu'
import Alert from './Alert'

const AppMain = ({ appViewType }) => {
  const onSubmit = async (expenseItem) => {
    try {
      const response = await fetch('/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseItem)
      })
      const data = await response.json()

      if (Number(data.statusCode) === 201) {
        setAlertMessage('入力が成功しました。')
      } else if (Number(data.statusCode) === 200) {
        setAlertMessage('更新が成功しました。')
      } else {
        setAlertMessage('入力が失敗しました。もう一度試してください。')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 1000)
    } catch (error) {
      setAlertMessage('入力が失敗しました。もう一度試してください。')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }
  }

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // eslint-disable-next-line react/prop-types
  const CurrentAppView = ({ appViewType }) => {
    if (appViewType === AppViewType.expenseForm) {
      return <ExpenseForm onSubmit={onSubmit} onCanceled={() => {}} />
    }
    if (appViewType === AppViewType.calendar) {
      return <Calendar />
    }
    if (appViewType === AppViewType.menu) {
      return <Menu />
    }
    if (appViewType === AppViewType.report) {
      return <Report />
    }
  }

  return (
    <section className='appMain'>
      <Alert show={ showAlert } message={ alertMessage } />
      <CurrentAppView appViewType={appViewType} />
    </section>
  )
}

AppMain.propTypes = {
  appViewType: PropTypes.number.isRequired
}

export default AppMain
