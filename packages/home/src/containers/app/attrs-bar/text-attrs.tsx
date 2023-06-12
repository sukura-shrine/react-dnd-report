import React, { useEffect, useState } from 'react'
import { Space, InputNumber } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import IconCheckbox from '../../../components/icon-checkbox/icon-checkbox'
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
        <div>对齐</div>
        <Align value={placeItems} onClick={v => setPlaceItems(v)} />
        {/* <Input size="small" value={placeItems} onChange={e => setPlaceItems(e.target.value)} /> */}
      </Space>
    </div>
  )
}
