import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useDrag, useDragLayer } from 'react-dnd'
import { PlusOutlined } from '@ant-design/icons'
import { RulerProps } from '../../components/types'
import { RulerContext } from './context'

interface HorizontalProps {
  loc: any,
  width: number,
  disable?: boolean
  onClick: (loc: any) => void
}
export const HorizontalDragHandler: React.FC<HorizontalProps> = ({ loc, width, disable, onClick }) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'table-horizontal-handler',
      item: { type: 'horizontal', loc, rulerItem: ref },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
        }
      }
    }
  }, [ref])
  
  return (
    <div ref={ref} className='ruler-item' style={{ width: `${width}px` }} onClick={() => onClick(loc)}>
      <div />
      {disable ? null : <div  className="horizontal-drag-handler-wrap"><div ref={drag} className='drag-handler'/></div>}
    </div>
  )
}

interface VerticalProps {
  loc: any,
  height: number,
  onClick: (loc: any) => void
}
export const VerticalDragHandler: React.FC<VerticalProps> = ({ loc, height, onClick }) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: 'table-vertical-handler',
      item: { type: 'vertical', loc, rulerItem: ref },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging(),
        }
      }
    }
  }, [ref])
  
  return (
    <div ref={ref} className='ruler-item' style={{ height: `${height}px` }} onClick={() => onClick(loc)}>
      <div />
      <div  className="vertical-drag-handler-wrap"><div ref={drag} className='drag-handler'/></div>
    </div>
  )
}

const Ruler: React.FC<RulerProps> = (props) => {
  const { importDataInterface, parentId } = props
  const { state, dispatch } = useContext(RulerContext)

  const { type, loc, width, height } = useDragLayer(monitor => {
    const item = monitor.getItem()
    const offset = monitor.getSourceClientOffset()
    if (!item?.rulerItem || !offset) {
      return {}
    }

    const rect = item.rulerItem.current.getBoundingClientRect()
    return {
      type: item.type,
      loc: item.loc,
      width: offset.x - rect.x,
      height: offset.y - rect.y
    }
  })

  useEffect(() => {
    if (type === 'vertical') {
      dispatch({
        type: 'updateRow',
        payload: {
          loc, height
        }
      })
    } else if (type === 'horizontal') {
      dispatch({
        type: 'updateColumn',
        payload: {
          loc, width
        }
      })
    }
    
  }, [type, loc, width, height])

  const onClickTopRuler = () => {

  }

  const onClickLeftRuler = (loc: any) => {
    dispatch({
      type: 'selectLeftRuler',
      payload: { loc }
    })
  }

  const onClickTop = () => {
    dispatch({
      type: 'addColumn'
    })
  }
  const onClickleft = () => {
    dispatch({
      type: 'addRow'
    })
  }

  const topRuler = useMemo(() => {
    if (parentId) {
      return null
    }
  
    const plusHanlde = (
      <div className='ruler-top-plus' onClick={onClickTop}>
        <PlusOutlined />
      </div>
    )
    const list = state.rulerColumns.map(({ loc, width }, i) => {
      return <HorizontalDragHandler key={i} loc={loc} width={width} onClick={onClickTopRuler} />
    })
  
    return (
      <div className='ruler-top'>
        {list}
        {importDataInterface ? null : plusHanlde}
      </div>
    )
  }, [importDataInterface, state.rulerColumns])

  const leftRuler = useMemo(() => {
    const plusHanlde = (
      <div className='ruler-left-plus' onClick={onClickleft}>
        <PlusOutlined />
      </div>
    )
    const list = state.rulerRows.map(({ loc, height }, i) => {
      return <VerticalDragHandler key={i} loc={loc} height={height} onClick={onClickLeftRuler} />
    })

    return (
      <div className='ruler-left'>
        {list}
        {importDataInterface ? null : plusHanlde}
      </div>
    )
  }, [importDataInterface, state.rulerRows])

  return (
    <div className="component-ruler">
      <div className='ruler-handle'></div>
      {topRuler}
      {leftRuler}
      <div className='ruler-content'>
        {props.children}
      </div>
    </div>
  )
}
export default Ruler
