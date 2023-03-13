import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, theme } from 'antd'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Tools from './tools'
import DropCanvas from './drop-canvas'

import 'antd/dist/reset.css'
import './app.style.css'

const { Header, Sider, Content } = Layout

export default function App (props: any) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <div className="container-app">
      <DndProvider backend={HTML5Backend}>
        <Tools />
        <DropCanvas />
      </DndProvider>  
    </div>
  )
}
