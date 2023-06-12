import React, { useState, useMemo } from 'react'
import classnames from 'classnames'
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable'
import { DragOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less'

export interface DnDHandleProps {
  className?: string
  fixed?: boolean
  showHandle?: boolean
  position?: { x: number, y: number }
  children?: React.ReactNode
  onStop?: DraggableEventHandler
}

export default function DnDHandle (props: DnDHandleProps) {
  const { fixed, showHandle, position } = props

  const onStop: DraggableEventHandler = (event, data) => {
    props.onStop && props.onStop(event, data)
  }

  const handle = (
    <div className="dnd-tools">
      {fixed ? null : <DragOutlined className="dnd-handle" />}
      <CloseOutlined />
    </div>
  )

  const children =  (
    <div className="dnd-handle-wrap">
      {showHandle ? handle : null}
      {props.children}
    </div>
  )

  return (
    <Draggable
      axis="both"
      handle=".dnd-handle"
      position={position}
      disabled={fixed}
      grid={[5, 5]}
      scale={1}
      onStop={onStop}
    >
      {children}
    </Draggable>
  )
}