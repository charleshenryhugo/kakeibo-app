import React from 'react'
import PropTypes from 'prop-types'
import './ConfirmDialog.scss'
import Dialog from './Dialog'

const ConfirmDialog = ({ show, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog show={show}>
      <section className='confirmDialog'>
        { title &&
          <p className='confirmDialog__title'>{title}</p>
        }
        <p className='confirmDialog__text'>{message}</p>
        <div className='confirmDialog__actions'>
          <span className='confirmDialog__actions--cancel' onClick={onCancel}>キャンセル</span>
          <span className='confirmDialog__actions--confirm' onClick={onConfirm}>はい</span>
        </div>
      </section>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default ConfirmDialog
