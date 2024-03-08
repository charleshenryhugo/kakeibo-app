import React, { useContext } from 'react'
import './AppFooter.scss'
import { AppViewType, AppViewTypeToText } from '../constants/AppViewType'
import { AppMainContext } from '../contexts/AppMainContext'

const AppFooter = () => {
  const { appViewType, setAppViewType } = useContext(AppMainContext)
  return (
    <section className='appFooterWrapper'>
      <div className='appFooter'>
        {Object.values(AppViewType).map((viewType, index) => (
          <span
            key={index}
            className={`appFooter__button ${appViewType === viewType ? 'active' : ''}`}
            onClick={() => setAppViewType(viewType)}
          >
            {AppViewTypeToText[viewType]}
          </span>
        ))}
      </div>
    </section>
  )
}

export default AppFooter
