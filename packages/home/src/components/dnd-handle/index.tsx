import React from 'react'
import classnames from 'classnames'
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from 'react-draggable'
import { DragOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less'

export interface DnDHandleProps {
  className?: string
  children?: React.ReactNode
  onStop?: DraggableEventHandler
}

export default function DnDHandle (props: DnDHandleProps) {
  return (
    <Draggable
      axis="both"
      handle=".dnd-handle"
      defaultPosition={{ x: 100, y: 100 }}
      grid={[5, 5]}
      scale={1}
      onStop={props.onStop}
    >
      <div className="dnd-handle-wrap">
        <div className="dnd-tools">
          <DragOutlined className="dnd-handle" />
          <CloseOutlined />
        </div>
        {props.children}
      </div>
    </Draggable>
  )
}