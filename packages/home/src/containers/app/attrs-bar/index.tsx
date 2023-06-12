import React from 'react'
import ComponentAttrs from './component-attrs'

import './style.less'

export default function Tools (props: any) {
  return (
    <div className="attrs-bar">
      <ComponentAttrs />
      <div className="attr-buttons">
        <div className="report-editor-button" onClick={props.onSave}>保存</div>
      </div>
    </div>
  )
}
