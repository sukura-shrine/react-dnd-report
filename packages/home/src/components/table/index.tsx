import React, { useContext, useEffect, useMemo, useState, useReducer } from 'react'
import { Resizable } from 're-resizable'
import { useDrag, useDragLayer } from 'react-dnd'
import Ruler from './ruler'
import { TextProps, TableHeaderProps, RulerProps } from '@/components/types'
import { RulerContext } from './context'
import model from './model'
import './style.css'

const Header:React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const list = []
  return (
    <div className='component-table-header'>
    </div>
  )
}

const Table:React.FC<TextProps> = (props: TextProps) => {
  const [state, dispatch] = useReducer(model.reducer, model.state)
  const [length, setLength] = useState(3)

  useEffect(() => {
    dispatch({
      type: 'createColumns',
      payload: { length }
    })
  }, [])
  return (
    <RulerContext.Provider value={{ state, dispatch }}>
      <div className='component-table' >
        <Ruler />
      </div>
    </RulerContext.Provider>
  )
}
export default Table