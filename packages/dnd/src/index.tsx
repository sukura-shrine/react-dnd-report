// app entry
import React from 'react'
import ReactDOM from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './app'

type AppProp = {
  [key: string]: any
}

let root

function render (props: AppProp) {
  root = ReactDOM.createRoot(document.getElementById('app') as Element)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

render({})