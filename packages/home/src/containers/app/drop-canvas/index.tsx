import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Text from '@/components/text'

import './style.css'

export default function DropCanvas (props: any) {
  const [list, setList] = useState<React.ReactElement[]>([])
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'test',
      drop: () => {
        setList([...list, <Text key={list.length} />])
      },
      collect: monitor => {
        return {
          isOver: monitor.isOver()
        }
      }
    }
  }, [list])
  return (
    <div ref={drop} className="drop-canvas">
      {list.map((children) => {
          return children
      })}
    </div>
  )
}