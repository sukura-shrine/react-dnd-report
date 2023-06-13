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
import { ItemConfig } from '@/global-model'
import Align from '@/components/align-checkbox'

interface TextAttrsProps {
  selectedItem: ItemConfig
  onChange: (key: string, value: string) => void
  // onChange: (itemConfig: ItemConfig) => void
}
export default function TextAttrs (props: TextAttrsProps) {
  const { selectedItem } = props
  const [placeItems, setPlaceItems] = useState<string>(selectedItem.placeItems as string)

  
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
      <Align value={selectedItem.placeItems} onClick={v => onChange('placeItems', v)} />
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
