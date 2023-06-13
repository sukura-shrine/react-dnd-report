import React from 'react'
import { useDrag } from 'react-dnd'
import './style.less'

export interface DragTextProps {
  children: React.ReactNode
}
export const DragText: React.FC<DragTextProps> = (props) => {
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
export const DragImg: React.FC<DragImgProps> = (props) => {
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

export interface DragHorizontalLineProps {
  children: React.ReactNode
}
export const DragHorizontalLine: React.FC<DragHorizontalLineProps> = (props) => {
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
export const DragTable: React.FC<DragTableProps> = (props) => {
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

export interface DragRectangleProps {
  children: React.ReactNode
}
export const DragRecangle: React.FC<DragRectangleProps> = (props) => {
  const [, drag] = useDrag(() => ({
    type: 'rectangle',
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
