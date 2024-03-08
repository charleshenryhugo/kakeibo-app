import React from 'react'
import PropTypes from 'prop-types'
import './AppHeader.scss'
import { AppViewTypeToText } from '../constants/AppViewType'

const AppHeader = ({ appViewType }) => {
  return (
    <section className='appHeaderWrapper'>
      <div className='appHeader'>
        <span className='appHeader__title'>{ AppViewTypeToText[appViewType] }</span>
      </div>
    </section>
  )
}

AppHeader.propTypes = {
  appViewType: PropTypes.number.isRequired
}

export default AppHeader
