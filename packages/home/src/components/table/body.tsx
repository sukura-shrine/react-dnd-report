import React, { useEffect, useContext, useMemo, useRef } from 'react'
import { fromEvent, map, switchMap, takeUntil, distinctUntilChanged } from 'rxjs'
import { TableBodyProps } from '../../components/types'
import { RulerContext } from './context'
import GlobalContext from '../../global-context'

import EditInput from '../edit-input'
import './style.less'

const Body:React.FC<TableBodyProps> = (props) => {
  const { fontSize, fontStyle, fontWeight, textDecoration, placeItems } = props

  const { state: globalState } = useContext(GlobalContext)
  const { state, dispatch } = useContext(RulerContext)
  const { rowLength, columnLength, rulerColumns, rulerRows, selectedGrids, values } = state

  const tBody = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const findNodeIndex = (node: HTMLElement | null): string | null => {
      if (!node || node === tBody.current) {
        return null
      }
      const dataIndex = node.getAttribute('data-index')
      if (dataIndex === null) {
        return findNodeIndex(node.parentElement)
      }
      return dataIndex
    }

    if (tBody.current) {
      const mousemove = fromEvent(tBody.current, 'mousemove')
      const mouseup = fromEvent(tBody.current, 'mouseup')
      const mousedown = fromEvent(tBody.current, 'mousedown')
      mousedown
        .pipe(
          switchMap(() => mousemove.pipe(takeUntil(mouseup))),
          // @ts-ignore
          map((e) => findNodeIndex(e.target)),
          distinctUntilChanged(),
        )
        .subscribe((value) => {
          dispatch({ type: 'selectGrid', payload: { index: value } })
        })

      mousedown
        // @ts-ignore
        .pipe(map((e) => findNodeIndex(e.target)))
        .subscribe((value) => {
          dispatch({ type: 'unSelect' })
          dispatch({ type: 'selectGrid', payload: { index: value } })
        })

      mouseup.subscribe(() => dispatch({ type: 'unSelect' }))
    }
  }, [tBody])

  const onEdit = (dataIndex: number, value: string) => {
    dispatch({
      type: 'editItem',
      payload: {
        dataIndex,
        value,
      }
    })
  }

  const style = useMemo(() => {
    return { fontSize, fontStyle, fontWeight, textDecoration, placeItems, }
  }, [fontSize, fontStyle, fontWeight, textDecoration, placeItems])

  const children = useMemo(() => {
    const grids = []
    
    let points
    if (selectedGrids) {
      let { startX, startY, endX, endY } = selectedGrids
      if (startX > endX) {
        [startX, endX] = [endX, startX]
      }
      if (startY > endY) {
        [startY, endY] = [endY, startY]
      }
      points = { startX, startY, endX, endY }
    }
    
    for(let y = 0; y < rowLength; y++ ) {
      for (let x = 0; x < columnLength; x++) {
        const key = y * columnLength + x
        let selected = false
        if (points) {
          selected = x >= points.startX && x <= points.endX && y >= points.startY && y <= points.endY
        }
        const val = values ? values[key] : ''
        const name = "table-body-grid" + (selected ? ' grid-selected' : '')
        grids.push(
          <div key={key} className={name} data-index={key}>
            <EditInput value={val} fieldsConfig={globalState.fieldsConfig} style={style} onChange={onEdit.bind(this, key)} />
          </div>
        )
      }
    }
    return grids
  }, [rowLength, columnLength, selectedGrids, values, style])
 
  const styles = useMemo(() => {
    return {
      'gridTemplateColumns':  rulerColumns.map(item => `${item.width}px`).join(' '),
      'gridTemplateRows': rulerRows.map(item => `${item.height}px`).join(' ')
    }
  }, [rulerColumns, rulerRows])
  
  return (
    <div ref={tBody} id="table-body" className="component-table-body" style={styles}>
      {children}
    </div>
  )
}

export default Body