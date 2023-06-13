import React, { useContext, useMemo } from 'react'
import { Space, Select, Form } from 'antd'
import GlobalContext from '../../../global-context'

import './style.less'

const Attrs: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const { selectedStory, storyList, storyKeyMap } = state
  const story = storyKeyMap[selectedStory]

  const onChange = (value: string) => {
    dispatch({
      type: 'selectStory',
      payload: { key: value }
    })
  }

  return (
    <div className="report-view-attrs">
      <Form>
        <Form.Item label="档案库">
          <Select size="small" style={{ width: 120 }} value={selectedStory} onChange={onChange}>
            {storyList.map(({ label, value }) => {
              return <Select.Option key={value} value={value}>{label}</Select.Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Attrs
