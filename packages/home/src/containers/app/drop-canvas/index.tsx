import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import Text from '@/components/text'
// import Image from '../../../components/image'
import Table from '@/components/table'
import HorizontalLine from '@/components/horizontal-line'
import Rectangle from '@/components/rectangle/rectangle'

import GlobalContext from '@/global-context'
import { ComponentType } from '@/global-model'

import './style.less'

const componentTypeMap = {
  'text': Text,
  // 'image': Image,
  'table': Table,
  'horizontal-line': HorizontalLine,
  'vertical-line': '',
  'rectangle': Rectangle,
}

export default function DropCanvas (props: any) {
  const { state, dispatch } = useContext(GlobalContext)
  const [list, setList] = useState<React.ReactElement[]>([])

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: ['text', 'image', 'table', 'rectangle', 'horizontal-line'],
      drop: (item, monitor) => {
        const type = monitor.getItemType() as ComponentType
        if (type) {
          dispatch({
            type: 'addItem',
            payload: { type: type }
          })
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

  const children = useMemo(() => {
    return state.reportConfig.children.map(item => {
      const { type, cid, ...arg } = item
      if (!type) {
        return null
      }
      const Component = componentTypeMap[type]
      return <Component key={cid} cid={cid} {...arg} />
    })
  }, [state.reportConfig])

  return (
    <div className="drop-canvas-wrap">
      <div ref={drop} id="drop-canvas" className="drop-canvas">
        {children}
      </div>
    </div>
  )
}