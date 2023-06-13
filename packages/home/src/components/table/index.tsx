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
  }, [globalState.reportConfig])

  useEffect(() => {
    if (!props.rulerColumns) {
      const { parentId, x, y, width } = props
      // @ts-ignore
      const parent = globalState.reportConfig.children.find(item => item.cid === parentId)
      const payload = {
        width,
        x,
        y
      }
      if (parent) {
        // @ts-ignore
        payload.parentConfig = parent
      }
      dispatch({ type: 'createGrid', payload })
    } else {
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

  const onClose = () => {
    globalDispatch({
      type: 'delItem',
      payload: { cid: props.cid }
    })
  }

  const onStop = (event: any, data: { x: number, y: number }) => {
    const { x, y } = data
    dispatch({
      type: 'updatePosition',
      payload: { x, y }
    })
  }

  const styles = useMemo(() => {
    const { fontSize, fontStyle, fontWeight, textDecoration } = props
    return {
      fontSize, fontStyle, fontWeight, textDecoration,
    }
  }, [props])

  const fixed = !!(props.importDataInterface && props.parentId)
  const position = { x: props.x || 0, y: props.y || 0 }
  const showHandle = globalState.selectedItem?.cid === props.cid

  return (
    <RulerContext.Provider value={{ state, dispatch }}>
      <DnDHandle fixed={fixed} showHandle={showHandle} position={position} onClose={onClose} onStop={onStop}>
        <div className='component-table' style={styles} onClick={onClick}>
          <Ruler parentId={props.parentId} importDataInterface={props.importDataInterface}>
            <Body {...props} />
          </Ruler>
        </div>
      </DnDHandle>
    </RulerContext.Provider>
  )
}
export default Table
