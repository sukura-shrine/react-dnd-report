import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Button, Form, Select } from 'antd'
import { ItemModel } from '../../../global-model'
import GlobalContext from '../../../global-context'

import './style.less'

const Attrs: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const { selectedItem } = state

  const onFinish = () => {}

  const onChange = (value: ItemModel) => {
    if (selectedItem) {
      dispatch({
        type: 'updateItemConfig',
        payload: {
          itemConfig: { ...selectedItem, model: value }
        }
      })
    }
  }

  const children = useMemo(() => {
    if (!selectedItem) {
      return null
    }
    return (
      <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item label="数据源">
          <Select size='small' onChange={onChange} style={{ width: 100 }} value={selectedItem.model}>
            <Select.Option value={ItemModel.INPUT}>输入</Select.Option>
            <Select.Option value={ItemModel.DATA}>接口</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    )
  }, [selectedItem])

  return (
    <div className="attrs">
      {children}
    </div>
  )
}

export default function Tools (props: any) {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <div className="attrs-bar">
      <Attrs />
      <div className="attr-buttons">
        <div className="report-editor-button">字段配置</div>
        <div className="report-editor-button" onClick={props.onSave}>保存</div>
      </div>
    </div>
  )
}
