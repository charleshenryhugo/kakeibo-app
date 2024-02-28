import React from 'react'
import './Alert.css'

const Alert = ({ show, message }) => {
  return (
    <section className={`alertWrapper ${show ? '' : 'hidden'}`}>
      <div className="alert">
        {message}
      </div>
    </section>
  )
}

export default Alert
