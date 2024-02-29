import React, { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'

import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader.js'
import AppMain from './components/AppMain.js'
import { AppViewType } from './constants/AppViewType.js'

function App () {
  const [appViewType, setAppViewType] = useState(AppViewType.expenseForm)

  return (
    <section className="App">
      <AppHeader appViewType={appViewType} />
      <AppMain appViewType={appViewType} />
      <AppFooter appViewType={appViewType} setAppViewType={setAppViewType}/>
    </section>
  )
}

export default App
