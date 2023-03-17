import React, { useState } from 'react'
import { DragText, DragImg, DragTable } from '@/components/drag-components'
import './style.css'

export default function Tools (props: any) {
  return (
    <div className="tools">
      <DragText>Text</DragText>
      <DragImg>Image</DragImg>
      <DragTable>Table</DragTable>
    </div>
  )
}
