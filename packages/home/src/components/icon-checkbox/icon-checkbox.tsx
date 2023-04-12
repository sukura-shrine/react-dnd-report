import React, { useContext, useState, useMemo } from 'react'
import classnames from 'classnames'
import './style.less'

interface IconCheckboxProps {
  checked?: boolean,
  border?: boolean
  padding?: number | string
  onCheck?: (checked: boolean) => void
  onClick?: () => void
  children?: React.ReactNode
}
const IconCheckbox: React.FC<IconCheckboxProps> = (props) => {
  const { checked, border, padding, onCheck } = props

  const onClick = () => {
    onCheck && onCheck(!checked)
    props.onClick && props.onClick()
  }

  return (
    <div onClick={onClick} className={classnames('icon-checkbox', { checked, border })} style={{ padding }}>
      {props.children}
    </div>
  )
}


export default IconCheckbox