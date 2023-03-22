import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useDrag, useDragLayer } from 'react-dnd'
import { RulerProps } from '@/components/types'
import { RulerContext } from './context'

export const DragHandler: React.FC<{ loc: any, width: number }> = ({ loc, width }) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'table-handler',
      item: { loc, rulerItem: ref },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
        }
      }
    }
  }, [ref])
  
  return (
    <div ref={ref} className='ruler-item' style={{ width: `${width}px` }}>
      <div />
      <div  className="drag-handler-wrap"><div ref={drag} className='drag-handler'/></div>
    </div>
  )
}

const Ruler: React.FC = (props: RulerProps) => {
  const { state, dispatch } = useContext(RulerContext)
  const { loc, width } = useDragLayer(monitor => {
    const item = monitor.getItem()
    const offset = monitor.getSourceClientOffset()
    if (!item || !offset) {
      return {}
    }
    const rect = item.rulerItem.current.getBoundingClientRect()
    return {
      width: offset.x - rect.x,
      loc: item.loc,
    }
  })

  useEffect(() => {
    dispatch({
      type: 'updateColumn',
      payload: {
        loc, width
      }
    })
  }, [loc, width])

  const children = useMemo(() => {
    return state.rulerColumns.map(({ loc, width }, i) => {
      return <DragHandler key={i} loc={loc} width={width} />
    })
  }, [state.rulerColumns])
  
  return (
    <div className="component-ruler">{children}</div>
  )
}
export default Ruler