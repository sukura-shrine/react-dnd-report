import React, { useState } from 'react'
import { DragText, DragImg, DragTable } from '@/components/drag-components'
import {
  TableOutlined
} from '@ant-design/icons';
import './style.css'

export default function Tools (props: any) {
  return (
    <div className="tools-wrap">
      <div className="tools-handle"></div>
      <div className="tools">
        <DragText>文</DragText>
          {/* <DragImg>Image</DragImg> */}
        <DragTable><TableOutlined /></DragTable>
      </div>
    </div>
  )
}
