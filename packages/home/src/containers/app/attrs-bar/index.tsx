import React, { useContext, useMemo } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import GlobalContext from '../../../global-context'
import ComponentAttrs from './component-attrs'
import ReportViewAttrs from './report-view-attrs'

import './style.less'

export default function Tools (props: any) {
  const { state, dispatch } = useContext(GlobalContext)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '视图',
      children: <ReportViewAttrs />,
    },
    {
      key: '2',
      label: '属性',
      children: <ComponentAttrs />,
    },
  ]

  return (
    <div className="attrs-bar">
      <Tabs type="card" items={items} />
      <div className="attr-buttons">
        <div className="report-editor-button" onClick={props.onSave}>保存</div>
      </div>
    </div>
  )
}
