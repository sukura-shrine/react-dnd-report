import React from 'react'
import { useDrag } from 'react-dnd'
import './style.less'

export interface DragTextProps {
  children: React.ReactNode
}
export const DragText: React.FC<DragTextProps> = (props:DragTextProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'text',
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return (
    <div ref={drag} className="drag-item">
      {props.children}
    </div>
  )
}

export interface DragImgProps {
  children: React.ReactNode
}
export const DragImg: React.FC<DragImgProps> = (props:DragImgProps) => {
  const [, drag] = useDrag(() => ({
    type: 'image',
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return (
    <div ref={drag} className="drag-item">
      {props.children}
    </div>
  )
}

export interface DragImgProps {
  children: React.ReactNode
}
export const DragHorizontalLine: React.FC<DragImgProps> = (props:DragImgProps) => {
  const [, drag] = useDrag(() => ({
    type: 'horizontal-line',
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return (
    <div ref={drag} className="drag-item">
      {props.children}
    </div>
  )
}

export interface DragTableProps {
  children: React.ReactNode
}
export const DragTable: React.FC<DragTableProps> = (props:DragTableProps) => {
  const [, drag] = useDrag(() => ({
    type: 'table',
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return (
    <div ref={drag} className="drag-item">
      {props.children}
    </div>
  )
}
