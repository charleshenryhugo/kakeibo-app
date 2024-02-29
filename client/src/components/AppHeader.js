import React from 'react'
import PropTypes from 'prop-types'
import './AppHeader.scss'
import { AppViewTypeToText } from '../constants/AppViewType'

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
  appViewType: PropTypes.number.isRequired
}

export default AppHeader
