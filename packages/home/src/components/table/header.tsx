import React, { useEffect, useReducer } from 'react'
import { TextProps, TableHeaderProps, RulerProps } from '../../components/types'
import { RulerContext } from './context'
import model from './table-model'
import './style.less'

const Header:React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const list = []
  
  return (
    <div className='component-table-header'>
    </div>
  )
}

export default Header