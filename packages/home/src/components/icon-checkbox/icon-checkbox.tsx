import React, { useContext, useState, useMemo } from 'react'
import classnames from 'classnames'
import './style.less'

interface IconCheckboxProps {
  checked?: boolean,
  onCheck?: (checked: boolean) => void
  children?: React.ReactNode
}
const IconCheckbox: React.FC<IconCheckboxProps> = (props) => {
  const { checked, onCheck } = props

  const onClick = () => {
    onCheck && onCheck(!checked)
  }
  return (
    <div onClick={onClick} className={classnames('icon-checkbox', { checked })}>
      {props.children}
    </div>
  )
}


export default IconCheckbox