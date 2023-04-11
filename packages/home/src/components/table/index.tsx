import React, { useContext, useEffect, useReducer, useMemo } from 'react'
import Ruler from './ruler'
import { TableBodyProps } from '../../components/types'
import { RulerContext } from './context'
import GlobalContext from '../../global-context'
import model from './model'

import Body from './body'
import './style.less'

const Table:React.FC<TableBodyProps> = (props) => {
  const context = useContext(GlobalContext)
  const [state, dispatch] = useReducer(model.reducer, model.state)

  const { reportWidth } = context.state
  useEffect(() => {
    dispatch({ type: 'createGrid', payload: { reportWidth } })
  }, [reportWidth])

  useEffect(() => {
    context.dispatch({
      type: 'updateTableItem',
      payload: {
        cid: props.cid,
        tableState: state,
      }
    })
  }, [state])

  const onClick = () => {
    context.dispatch({
      type: 'selectItem',
      payload: {
        cid: props.cid,
      }
    })
  }

  const styles = useMemo(() => {
    const { fontSize, fontStyle, fontWeight, textDecoration } = props
    return {
      fontSize, fontStyle, fontWeight, textDecoration,
    }
  }, [props])

  return (
    <RulerContext.Provider value={{ state, dispatch }}>
      <div className='component-table' style={styles} onClick={onClick}>
        <Ruler>
          <Body {...props} />
        </Ruler>
      </div>
    </RulerContext.Provider>
  )
}
export default Table