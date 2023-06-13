import React, { useContext, useState, useMemo } from 'react'
import { Resizable } from 're-resizable'

import { TextProps } from '../types'
import GlobalContext from '../../global-context'
import DnDHandle from '../dnd-handle'
import './style.less'

const Rectangle: React.FC<TextProps> = (props) => {
  const { state, dispatch } = useContext(GlobalContext)
  const [position, setPosition] = useState({ x: props.x || 0, y: props.y || 0 })

  const [size, setSize] = useState({
    width: props.width!,
    height: props.height!,
  })

  const onClick = () => {
    dispatch({
      type: 'selectItem',
      payload: {
        cid: props.cid
      }
    })
  }
  // @ts-ignore
  const onResizeStop = (e, direction, ref, d) => {
    const newSize = {
      width: size.width + d.width,
      height: size.height + d.height,
    }
    dispatch({
      type: 'updateItem',
      payload: {
        cid: props.cid,
        ...newSize
      }
    })
    setSize(newSize)
  }

  const onClose = () => {
    dispatch({
      type: 'delItem',
      payload: { cid: props.cid }
    })
  }

  const onStop = (event: any, data: { x: number, y: number }) => {
    const position = { x: data.x, y: data.y }
    setPosition(position)
    dispatch({
      type: 'updateItem',
      payload: {
        cid: props.cid,
        ...position,
      }
    })
  }

  return (
    <DnDHandle showHandle={props.cid === state.selectedItem?.cid} position={position} onClose={onClose} onStop={onStop}>
      <Resizable size={size} onResizeStop={onResizeStop}>
        <div className='rect-wrap' onClick={onClick}>
          <div className='horizontal-line'></div>
        </div>
      </Resizable>
    </DnDHandle>
  )
}
export default Rectangle