import React, { useContext, useMemo } from 'react'
import { Space, Select } from 'antd'
import GlobalContext from '../../../global-context'

import './style.less'

const Attrs: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const { selectedItem } = state

  return (
    <div className="attrs">
      <div className="attr-block">
        <Space>
          <div>档案库</div>
          <Select size="small" style={{ width: 120 }}>
            <Select.Option>档案库1</Select.Option>
            <Select.Option>档案库2</Select.Option>
          </Select> 
        </Space>
      </div>
    </div>
  )
}

export default Attrs
