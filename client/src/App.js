import React, { useState } from 'react'
// import logo from './logo.svg'
import './App.scss'

import AppFooter from './components/AppFooter'
import AppMain from './components/AppMain'
import { AppViewType } from './constants/AppViewType'
import { AppMainContext } from './contexts/AppMainContext'

function App () {
  const [appViewType, setAppViewType] = useState(AppViewType.expenseForm)

  return (
    <section className="app">
      <AppMainContext.Provider value={{ appViewType, setAppViewType }}>
        <AppMain />
        <AppFooter />
      </AppMainContext.Provider>
    </section>
  )
}

export default App
