import React from 'react'
import './AppHeader.scss'
import { AppViewType, AppViewTypeToText } from '../constants/AppViewType'

const AppHeader = ({ appViewType }) => {
  return (
    <section className='AppHeaderWrapper'>
      <div className='AppHeader'>
        <span className='AppHeader__title'>{ AppViewTypeToText[appViewType] }</span>
      </div>
    </section>
  )
}

AppHeader.propTypes = {
  appViewType: AppViewType.isRequired
}

export default AppHeader
