import React, { useEffect, useContext, useMemo, useRef } from 'react'
import { fromEvent, map, switchMap, takeUntil, distinctUntilChanged } from 'rxjs'
import classNames from 'classNames'
import { TableBodyProps } from '@/components/types'
import { RulerContext } from './context'

import EditInput from '../edit-input'
import './style.css'

const Body:React.FC<TableBodyProps> = (props: TableBodyProps) => {
  const { state, dispatch } = useContext(RulerContext)
  const { rowLength, columnLength, rulerColumns, rulerRows, selectedGrids } = state

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
    
    for(let i = 0; i < rowLength; i++ ) {
      for (let j = 0; j < columnLength; j++) {
        const key = `${j},${i}`
        let selected = false
        if (points) {
          selected = j >= points.startX && j <= points.endX && i >= points.startY && i <= points.endY
        }
        grids.push(
          <div key={key} className={classNames("table-body-grid", { "grid-selected": selected })} data-index={key}>
            <EditInput />
          </div>
        )
      }
    }
    return grids
  }, [rowLength, columnLength, selectedGrids])
 
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