import React, { useEffect, useReducer } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { message } from 'antd'
import Tools from './tools'
import DropCanvas from './drop-canvas'
import ArrtsBar from './attrs-bar'
import HorizontalLineAttrs from './attrs-bar/report-view-attrs'

import GlobalContext from '../../global-context'
import GlobalModel from '../../global-model'

import './style.less'

export default function App (props: any) {
  const [state, dispatch] = useReducer(GlobalModel.reducer, GlobalModel.state)

  useEffect(() => {
    let config = localStorage.getItem('config')
    config = config ? JSON.parse(config) : {}
    
    dispatch({
      type: 'reportInit',
      payload: { config }
    })
  }, [])

  const onSave = () => {
    const { selectedItem, ...args } = state
    message.success('保存成功！')
    localStorage.setItem('config', JSON.stringify(args))
    // updateReportTemplate({ id, reportTitle, remark, reportConfig: { reportWidth, fieldsConfig, reportConfig } })
  }

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="container-app-wrap">
        <div className="container-app">
          <div className='header'>
            <ArrtsBar onSave={onSave} />
          </div>
          <div className="body">
            <DndProvider backend={HTML5Backend}>
              <Tools onSave={() => console.log(state)}/>
              <DropCanvas />
              <HorizontalLineAttrs />
            </DndProvider>  
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  )
}
