import React, { useContext, useEffect, useReducer } from 'react'
import Ruler from './ruler'
import { TextProps } from '@/components/types'
import { RulerContext } from './context'
import GlobalContext from '@/global-context'
import model from './model'

import Body from './body'
import './style.css'

const Table:React.FC<TextProps> = (props: TextProps) => {
  const context = useContext(GlobalContext)
  const [state, dispatch] = useReducer(model.reducer, model.state)

  const { reportWidth } = context.state
  useEffect(() => {
    dispatch({ type: 'createGrid', payload: { reportWidth } })
  }, [reportWidth])
  return (
    <RulerContext.Provider value={{ state, dispatch }}>
      <div className='component-table' >
        <Ruler>
          <Body />
        </Ruler>
      </div>
    </RulerContext.Provider>
  )
}
export default Table