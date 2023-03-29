import React, { useState, useReducer } from 'react'
import { Layout, Menu, theme } from 'antd'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// @ts-ignore

import Tools from './tools'
import DropCanvas from './drop-canvas'
import ArrtsBar from './attrs-bar'

import GlobalContext from '@/global-context'
import GlobalModel from '@/global-model'

import 'antd/dist/reset.css'
import './app.style.css'

const { Header, Sider, Content } = Layout

export default function App (props: any) {
  const [state, dispatch] = useReducer(GlobalModel.reducer, GlobalModel.state)
  const {
    token: {},
  } = theme.useToken()

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className="container-app-wrap">
        <div className="container-app">
          <div className='header'>
            <ArrtsBar />
          </div>
          <div className="body">
            <DndProvider backend={HTML5Backend}>
              <Tools />
              <DropCanvas />
            </DndProvider>  
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  )
}
