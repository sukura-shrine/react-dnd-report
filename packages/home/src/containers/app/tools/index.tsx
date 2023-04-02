import React from 'react'
import { DragText, DragTable } from '../../../components/drag-components'
import {
  TableOutlined
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
      </div>
    </div>
  )
}
