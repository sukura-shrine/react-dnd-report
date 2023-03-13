import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import { Resizable } from 're-resizable'

export default function App (props: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'test',
    collect: monitor => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return (
    <div className="tools">
      <div ref={drag} className="tools">
        Tools
      </div>
    </div>
  )
}
