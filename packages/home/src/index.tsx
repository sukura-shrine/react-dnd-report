import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from './router'

import './global.style.css'

type AppProp = {
  [key: string]: any
}

let root:any

function render (props: AppProp) {
  root = ReactDOM.createRoot(document.getElementById('app') as Element)
  root.render(
    <RouterProvider router={createBrowserRouter(router)} />
  )
}
render({})
