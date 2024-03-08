import React, { useState } from 'react'
// import logo from './logo.svg'
import './App.scss'

import AppFooter from './components/AppFooter'
import AppMain from './components/AppMain.js'
import { AppViewType } from './constants/AppViewType.js'

function App () {
  const [appViewType, setAppViewType] = useState(AppViewType.expenseForm)

  return (
    <section className="app">
      <AppMain appViewType={appViewType} />
      <AppFooter appViewType={appViewType} setAppViewType={setAppViewType} />
    </section>
  )
}

export default App
