import React, { useEffect, useState, useContext } from 'react'
import { useDrop } from 'react-dnd'
import Text from '@/components/text'
import Image from '@/components/image'
import Table from '@/components/table'
import GlobalContext from '@/global-context'

import './style.css'

const componentTypeMap = {
  'text': Text,
  'image': Image,
  'table': Table,
}

type MapType = 'text' | 'image'

export default function DropCanvas (props: any) {
  const { state, dispatch } = useContext(GlobalContext)
  const [list, setList] = useState<React.ReactElement[]>([])
  const [rect, setRect] = useState<DOMRect>()

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: ['text', 'image', 'table'],
      drop: (item, monitor) => {
        const type = monitor.getItemType() as MapType
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

  useEffect(() => {
    const el = document.getElementById('drop-canvas')
    const rect = el?.getBoundingClientRect()
    if (rect) {
      dispatch({
        type: 'updateReportSize',
        payload: {
          reportWidth: rect.width
        }
      })
    }
  }, [])

  return (
    <div ref={drop} id="drop-canvas" className="drop-canvas">
      {list.map((children) => {
        return children
      })}
    </div>
  )
}