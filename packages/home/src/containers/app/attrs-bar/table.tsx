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
import Align from './align'

interface TableAttrsProps {
  selectedItem: ItemConfig
  onChange: (itemConfig: ItemConfig) => void
}
export default function TableAttrs (props: TableAttrsProps) {
  const { selectedItem } = props
  const [fontSize, setFontSize] = useState<number>(selectedItem.fontSize || 14)
  const [fontWeight, setFontWeight] = useState<string>(selectedItem.fontWeight as string)
  const [fontStyle, setFontStyle] = useState<string>(selectedItem.fontStyle as string)
  const [textDecoration, setTextDecoration] = useState<string>(selectedItem.textDecoration as string)
  const [placeItems, setPlaceItems] = useState<string>(selectedItem.placeItems as string)
  const [dataGroup, setDataGroup] = useState<string>(selectedItem.dataGroup as string)
  
  const onFontStyleChange = (type: string, checked: boolean) => {
    if (type === 'bold') {
      setFontWeight(checked ? 'bold' : '')
    } else if (type === 'italic') {
      setFontStyle(checked ? 'italic' : '')
    } else if (type === 'underline') {
      setTextDecoration(checked ? 'underline' : '')
    }
  }
  useEffect(() => {
    const item = {
      ...selectedItem,
      fontSize,
      fontWeight,
      fontStyle,
      textDecoration,
      placeItems,
      dataGroup
    }
    props.onChange(item)
  }, [selectedItem.cid, fontSize, fontWeight, fontStyle, textDecoration, placeItems, dataGroup])

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
        
        <div>对齐</div>
        <Align value={placeItems} onClick={v => setPlaceItems(v)} />

        <div>分组</div>
        <Input size="small" onChange={e => setDataGroup(e.target.value)} />
      </Space>
    </div>
  )
}
