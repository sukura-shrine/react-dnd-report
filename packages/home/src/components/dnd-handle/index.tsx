import React, { useState, useMemo } from 'react'
import classnames from 'classnames'
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable'
import { DragOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less'

export interface DnDHandleProps {
  className?: string
  fixed?: boolean
  position?: { x: number, y: number }
  children?: React.ReactNode
  onStop?: DraggableEventHandler
}

export default function DnDHandle (props: DnDHandleProps) {
  const { fixed, position } = props

  const onStop: DraggableEventHandler = (event, data) => {
    props.onStop && props.onStop(event, data)
  }

  const children = useMemo(() => {
    const styles = fixed && position ? { left: position.x, top: position.y } : undefined
    const children =  (
      <div className="dnd-handle-wrap" style={styles}>
        <div className="dnd-tools">
          <DragOutlined className="dnd-handle" />
          <CloseOutlined />
        </div>
        {props.children}
      </div>
    )

    if (fixed) {
      return children
    }
    return (
      <Draggable
        axis="both"
        handle=".dnd-handle"
        position={props.position}
        grid={[5, 5]}
        scale={1}
        onStop={onStop}
      >
        {children}
      </Draggable>
    )
  }, [fixed, position])

  return children
}