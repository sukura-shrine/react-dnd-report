import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Space, InputNumber, Input, Button, Form, Select } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import IconCheckbox from '../../../components/icon-checkbox/icon-checkbox'
import { ItemConfig } from '../../../global-model'

interface TableAttrsProps {
  selectedItem: ItemConfig
  onChange: (itemConfig: ItemConfig) => void
}
export default function TableAttrs (props: TableAttrsProps) {
  const { selectedItem } = props
  const [fontSize, setFontSize] = useState<number>(selectedItem.fontSize || 14)
  const [fontWeight, setFontWeight] = useState<string>()
  const [fontStyle, setFontStyle] = useState<string>()
  const [textDecoration, setTextDecoration] = useState<string>()
  const [dataGroup, setDataGroup] = useState<string>()
  
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
    const item = { ...selectedItem, fontSize, fontWeight, fontStyle, textDecoration, dataGroup }
    props.onChange(item)
  }, [fontSize, fontWeight, fontStyle, textDecoration, dataGroup])

  return (
    <div>
      <Space>
        <div>字体</div>
        <div><InputNumber size="small" min={12} max={100} defaultValue={fontSize} onChange={v => setFontSize(Number(v))} /></div>
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
        <BorderInnerOutlined />
        <div>分组</div>
        <Input size="small" onChange={e => setDataGroup(e.target.value)} />
      </Space>
    </div>
  )
}
