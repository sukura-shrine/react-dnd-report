import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/app'
import './style.less'

// export default App


// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import router from './router'

// import './global.style.css'

const root = ReactDOM.createRoot(document.getElementById('app') as Element)
root.render(<App />)

// type AppProp = {
//   [key: string]: any
// }

// let root:any

// function render (props: AppProp) {
//   root = ReactDOM.createRoot(document.getElementById('app') as Element)
//   root.render(
//     <RouterProvider router={createBrowserRouter(router)} />
//   )
// }
// render({})
