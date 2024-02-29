import React from 'react'
import PropTypes from 'prop-types'
import './AppFooter.scss'
import { AppViewType, AppViewTypeToText } from '../constants/AppViewType.js'

const AppFooter = ({ appViewType, setAppViewType }) => {
  return (
    <section className='AppFooterWrapper'>
      <div className='AppFooter'>
        {Object.values(AppViewType).map((viewType, index) => (
          <span
            key={index}
            className={`AppFooter__button ${appViewType === viewType ? 'active' : ''}`}
            onClick={() => setAppViewType(viewType)}
          >
            {AppViewTypeToText[viewType]}
          </span>
        ))}
      </div>
    </section>
  )
}

AppFooter.propTypes = {
  appViewType: AppViewType.isRequired,
  setAppViewType: PropTypes.func.isRequired
}

export default AppFooter
