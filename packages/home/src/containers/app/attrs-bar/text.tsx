import React, { useContext, useEffect, useState, useMemo, ReactEventHandler } from 'react'
import { Space, Form, Select, Input, InputNumber } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import IconCheckbox from '../../../components/icon-checkbox/icon-checkbox'
import { ItemConfig } from '../../../global-model'

interface TextAttrsProps {
  selectedItem: ItemConfig
  onChange: (itemConfig: ItemConfig) => void
}
export default function TextAttrs (props: TextAttrsProps) {
  const { selectedItem } = props
  const [fontSize, setFontSize] = useState<number>(selectedItem.fontSize || 14)
  const [fontWeight, setFontWeight] = useState<string>()
  const [fontStyle, setFontStyle] = useState<string>()
  const [textDecoration, setTextDecoration] = useState<string>()

  const onFontStyleChange = (type: string, checked: boolean) => {
    if (type === 'bold') {
      setFontWeight(checked ? 'bold' : undefined)
    } else if (type === 'italic') {
      setFontStyle(checked ? 'italic' : undefined)
    } else if (type === 'underline') {
      setTextDecoration(checked ? 'underline' : undefined)
    }
  }
  useEffect(() => {
    const item = { ...selectedItem, fontSize, fontWeight, fontStyle, textDecoration }
    props.onChange(item)
  }, [fontSize, fontWeight, fontStyle, textDecoration])

  return (
    <div className='attr-text'>
      <Space>
        <div>字体</div>
        <div><InputNumber size="small" min={12} max={100} defaultValue={fontSize} onChange={v => setFontSize(Number(v))} /></div>
        <Space size={4}>
          <IconCheckbox
            checked={!!fontWeight}
            onCheck={(checked) => onFontStyleChange('bold', checked)}
          >
            <BoldOutlined />
          </IconCheckbox>
          <IconCheckbox
            checked={!!fontStyle}
            onCheck={(checked) => onFontStyleChange('italic', checked)}
          >
            <ItalicOutlined />
          </IconCheckbox>
          <IconCheckbox
            checked={!!textDecoration}
            onCheck={(checked) => onFontStyleChange('underline', checked)}
          >
            <UnderlineOutlined />
          </IconCheckbox>
        </Space>
        <BorderInnerOutlined />
      </Space>
    </div>
  )
}
