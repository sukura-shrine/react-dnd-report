import React, { useEffect, useState } from 'react'
import { Space, InputNumber } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import { Checkbox } from 'antd'
import IconCheckbox from '@/components/icon-checkbox/icon-checkbox'
import SpaceLine from '@/components/space-line'
import { ItemConfig } from '../../../global-model'
import Align from './align'

interface TextAttrsProps {
  selectedItem: ItemConfig
  onChange: (key: string, value: string) => void
  // onChange: (itemConfig: ItemConfig) => void
}
export default function TextAttrs (props: TextAttrsProps) {
  const { selectedItem } = props
  const [fontSize, setFontSize] = useState<number>(selectedItem.fontSize || 14)
  const [fontWeight, setFontWeight] = useState<string>(selectedItem.fontWeight as string)
  const [fontStyle, setFontStyle] = useState<string>(selectedItem.fontStyle as string)
  const [textDecoration, setTextDecoration] = useState<string>(selectedItem.textDecoration as string)
  const [placeItems, setPlaceItems] = useState<string>(selectedItem.placeItems as string)

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
    // const item = {
    //   ...selectedItem,
    //   fontSize,
    //   fontWeight,
    //   fontStyle,
    //   textDecoration,
    //   placeItems
    // }
    // props.onChange(item)
  }, [selectedItem.cid, fontSize, fontWeight, fontStyle, textDecoration, placeItems])
  
  const onChange = (key: string, value: any) => {
    props.onChange && props.onChange(key, value)
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div className="attr-block">
        <Space>
          <div>字体</div>
          <InputNumber
            size="small"
            min={12}
            max={100}
            value={selectedItem.fontSize}
            style={{ width: 68 }}
            onChange={v => onChange('fontSize', v)}
          />
        </Space>
        <Space>
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
          {/* <BorderInnerOutlined /> */}
        </Space>
      </div>
      <SpaceLine />
      <Align value={placeItems} onClick={v => setPlaceItems(v)} />
      <div className="attr-block">
        <Space>
          <div>接入数据接口</div>
          <Checkbox
            checked={selectedItem.importDataInterface}
            onChange={e => onChange('importDataInterface', e.target.checked)}
          />
        </Space>
      </div>
    </div>
  )
}
