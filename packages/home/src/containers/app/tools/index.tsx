import React from 'react'
import { DragText, DragTable, DragHorizontalLine, DragRecangle } from '@/components/drag-components'
import {
  TableOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import './style.less'

export default function Tools (props: any) {
  return (
    <div className="tools-wrap">
      <div className="tools-handle"></div>
      <div className="tools">
        <DragText>文</DragText>
          {/* <DragImg>Image</DragImg> */}
        <DragTable><TableOutlined /></DragTable>
        <DragRecangle><BorderOutlined /></DragRecangle>
        <DragHorizontalLine>一</DragHorizontalLine>
      </div>
    </div>
  )
}
