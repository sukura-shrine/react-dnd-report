import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/app'
import './style.less'

const root = ReactDOM.createRoot(document.getElementById('app') as Element)
root.render(<App />)
