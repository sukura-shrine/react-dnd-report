import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Text from '@/components/text'
import Image from '@/components/image'
import Table from '@/components/table'

import './style.css'

const componentTypeMap = {
  'text': Text,
  'image': Image,
  'table': Table,
}

type MapType = 'text' | 'image'

export default function DropCanvas (props: any) {
  const [list, setList] = useState<React.ReactElement[]>([])
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: ['text', 'image', 'table'],
      drop: (item, monitor) => {
        const type = monitor.getItemType() as MapType
        console.log(type)
        if (type) {
          const Component = componentTypeMap[type]
          setList([...list, <Component key={list.length} />])
        }
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