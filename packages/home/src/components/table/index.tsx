import React, { useContext, useEffect, useReducer, useMemo } from 'react'
import Ruler from './ruler'
import DnDHandle from '@/components/dnd-handle'
import { TableBodyProps } from '../../components/types'
import { RulerContext } from './context'
import GlobalContext from '../../global-context'
import model from './table-model'

import Body from './body'
import './style.less'

const Table:React.FC<TableBodyProps> = (props) => {
  const { state: globalState, dispatch: globalDispatch } = useContext(GlobalContext)
  const [state, dispatch] = useReducer(model.reducer, model.state)

  useEffect(() => {
    if (!props.rulerColumns) {
      const { reportWidth } = globalState
      dispatch({ type: 'createGrid', payload: { reportWidth } })
    } else {
      console.log(props)
      dispatch({
        type: 'tableInit',
        payload: props,
      })
    }
  }, [])

  useEffect(() => {
    globalDispatch({
      type: 'updateTableItem',
      payload: {
        cid: props.cid,
        tableState: state,
      }
    })
  }, [state])

  const onClick = () => {
    globalDispatch({
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
    <DnDHandle>
      <RulerContext.Provider value={{ state, dispatch }}>
        <div className='component-table' style={styles} onClick={onClick}>
          <Ruler parentId={props.parentId} importDataInterface={props.importDataInterface}>
            <Body {...props} />
          </Ruler>
        </div>
      </RulerContext.Provider>
    </DnDHandle>
  )
}
export default Table