import React from 'react'
import { Resizable } from 're-resizable'
import { TextProps } from '@/components/types'
import './style.css'

const Text:React.FC<TextProps> = (props: TextProps) => {
  return (
    <Resizable
      defaultSize={{
        width: 320,
        height: 200,
      }}
    >
      <div className='componse-text' style={{ border: "1px solid", cursor: 'move' }}>Text</div>
    </Resizable>
  )
}
export default Text