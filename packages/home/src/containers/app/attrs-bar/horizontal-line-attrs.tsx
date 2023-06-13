import React, { useEffect, useState } from 'react'
import { Space, InputNumber } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import { ItemConfig } from '@/global-model'

interface HorizontalAttrsProps {
  selectedItem: ItemConfig
  onChange: (key: string, value: string) => void
}
export default function HorizontalLineAttrs (props: HorizontalAttrsProps) {
  const { selectedItem } = props
  const onChange = (key: string, value: any) => {
    props.onChange && props.onChange(key, value)
  }

  return (
    <div className='attr-text'>
      <Space>
        {/* <div>宽度</div>
        <div><InputNumber size="small" value={selectedItem.width} min={12} onChange={v => onChange('width', Number(v))} /></div> */}
        {/* <div>线粗</div>
        <div><InputNumber size="small" min={1} max={10} onChange={v => onChange('lineWidtth', Number(v))} /></div> */}
      </Space>
    </div>
  )
}
