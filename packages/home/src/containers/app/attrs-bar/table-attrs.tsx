import React, { useEffect, useState } from 'react'
import { Space, InputNumber, Input, Checkbox } from 'antd'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'

import IconCheckbox from '../../../components/icon-checkbox/icon-checkbox'
import SpaceLine from '@/components/space-line'
import { ItemConfig } from '../../../global-model'
import Align from '@/components/align-checkbox'

interface TableAttrsProps {
  selectedItem: ItemConfig
  onChange: (key: string, value: any) => void
}

export default function TableAttrs (props: TableAttrsProps) {
  const { selectedItem } = props
  const [fontWeight, setFontWeight] = useState<string>(selectedItem.fontWeight as string)
  const [fontStyle, setFontStyle] = useState<string>(selectedItem.fontStyle as string)
  const [textDecoration, setTextDecoration] = useState<string>(selectedItem.textDecoration as string)
  
  const onFontStyleChange = (type: string, checked: boolean) => {
    if (type === 'bold') {
      setFontWeight(checked ? 'bold' : '')
    } else if (type === 'italic') {
      setFontStyle(checked ? 'italic' : '')
    } else if (type === 'underline') {
      setTextDecoration(checked ? 'underline' : '')
    }
  }
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
            checked={!!selectedItem.fontWeight}
            onCheck={(checked) => onChange('fontWeight', checked ? 'bold' : undefined)}
          >
            <BoldOutlined />
          </IconCheckbox>
          <IconCheckbox
            checked={!!selectedItem.fontStyle}
            onCheck={(checked) => onChange('fontStyle', checked ? 'italic' : undefined)}
          >
            <ItalicOutlined />
          </IconCheckbox>
          <IconCheckbox
            checked={!!selectedItem.textDecoration}
            onCheck={(checked) => onChange('textDecoration', checked ? 'underline' : undefined)}
          >
            <UnderlineOutlined />
          </IconCheckbox>
          {/* <BorderInnerOutlined /> */}
        </Space>
      </div>
      <SpaceLine />
      <Align value={selectedItem.fontWeight} onClick={v => onChange('placeItems', v)} />
      <SpaceLine />
      <div className="attr-block">
        <Space>
          <div>接入数据接口</div>
          <Checkbox
            checked={selectedItem.importDataInterface}
            onChange={e => {
              onChange('importDataInterface', e.target.checked)
            }}
          />
        </Space>
        <Space>
          <div>分组</div>
          <Input
            size="small"
            value={selectedItem.dataGroup}
            style={{ width: 80 }}
            onChange={e => onChange('dataGroup', e.target.value)}
          />
        </Space>
      </div>
    </div>
  )
}
