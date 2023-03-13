import React from 'react'
import './app.style.css'

export default function App (props: { title: string }) {
  
  return (
    <div className="container">
      <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="80%">{props.title || '精彩呈现'}</text>
        </symbol>

        <g className = "g-ants">
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
        </g>
      </svg>
    </div>
  )
}
