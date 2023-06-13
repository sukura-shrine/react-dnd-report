import React, { useContext, useState, useMemo } from 'react'
import { Resizable } from 're-resizable'
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable'

import EditInput from '../../components/edit-input'
import { TextProps } from '../../components/types'
import GlobalContext from '../../global-context'
import DnDHandle from '../dnd-handle'
import './style.less'

const Text: React.FC<TextProps> = (props) => {
  const { state, dispatch } = useContext(GlobalContext)
  const { fieldsConfig } = state
  const [position, setPosition] = useState({ x: props.x || 0, y: props.y || 0 })

  const [size, setSize] = useState({
    width: props.width || 80,
    height: props.height || 20,
  })

  const onClick = () => {
    dispatch({
      type: 'selectItem',
      payload: {
        cid: props.cid
      }
    })
  }
  const onChange = (value: string) => {
    dispatch({
      type: 'updateItem',
      payload: {
        cid: props.cid,
        value
      }
    })
  }
  // @ts-ignore
  const onResizeStop = (e, direction, ref, d) => {
    const newSize = {
      width: size.width + d.width,
      height: size.height + d.height
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

  const styles = useMemo(() => {
    const { fontSize, fontWeight, fontStyle, textDecoration, placeItems } = props
    return {
      border: '1px solid',
      borderColor: state.selectedItem?.cid === props.cid ? '#a3d8fb' : undefined,
      cursor: 'move',
      fontSize, fontWeight, fontStyle, textDecoration, placeItems,
    }
  }, [props, state.selectedItem])

  return (
    <DnDHandle position={position} showHandle={props.cid === state.selectedItem?.cid} onClose={onClose} onStop={onStop}>
      <Resizable size={size} onResizeStop={onResizeStop}>
        <div className='componse-text' onClick={onClick}>
          <EditInput value={props.value} model={props.model} fieldsConfig={fieldsConfig} style={styles} onChange={onChange} />
        </div>
      </Resizable>
    </DnDHandle>
  )
}
export default Text