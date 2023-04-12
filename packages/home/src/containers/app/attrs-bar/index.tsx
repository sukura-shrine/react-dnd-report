import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Button, Form, Select } from 'antd'
import { ItemConfig, ComponentType } from '../../../global-model'
import GlobalContext from '../../../global-context'
import Text from './text'
import Table from './table'

import './style.less'

const Attrs: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const { selectedItem } = state

  const onChange = (itemConfig: ItemConfig) => {
    dispatch({
      type: 'updateItemConfig',
      payload: {
        itemConfig: itemConfig
      }
    })
  }

  const children = useMemo(() => {
    if (!selectedItem) {
      return null
    }
    const { type } = selectedItem
    if (type === ComponentType.TEXT) {
      return <Text selectedItem={selectedItem} onChange={onChange} />
    }
    if (type === ComponentType.TABLE) {
      return <Table selectedItem={selectedItem} onChange={onChange} />
    }
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
        <div className="report-editor-button" onClick={props.onSave}>保存</div>
      </div>
    </div>
  )
}
