import React, { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'
import ExpenseForm from './views/ExpenseForm'
import Alert from './components/Alert'

function App() {
  const onSubmit = async (expenseItem) => {
    try {
      const response = await fetch('/api/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseItem),
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

  return (
    <div className="App">
      <Alert show={ showAlert } message={ alertMessage } />
      <ExpenseForm onSubmit={onSubmit} onCanceled={() => {}}/>
    </div>
  );
}

export default App;
