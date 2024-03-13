import React, { useContext } from 'react'
import './AppFooter.scss'
import { AppViewType, AppViewTypeIconName, AppViewTypeToText } from '../constants/AppViewType'
import { AppMainContext } from '../contexts/AppMainContext'
import * as LuIcons from 'react-icons/lu'

const AppFooter = () => {
  const { appViewType, setAppViewType } = useContext(AppMainContext)
  return (
    <section className='appFooterWrapper'>
      <div className='appFooter'>
        {Object.values(AppViewType).map((viewType, index) => {
          const IconComponent = LuIcons[AppViewTypeIconName[viewType]]
          return (
            <span
              key={index}
              className={`appFooter__button ${appViewType === viewType ? 'active' : ''}`}
              onClick={() => setAppViewType(viewType)}
            >
              <IconComponent size='2rem' />
              {AppViewTypeToText[viewType]}
            </span>
          )
        })}
      </div>
    </section>
  )
}

export default AppFooter
