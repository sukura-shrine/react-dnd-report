import React from 'react'
import { Resizable } from 're-resizable'
import EditInput from '@/components/edit-input'
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
      <div className='componse-text' style={{ border: "1px solid", cursor: 'move' }}><EditInput /></div>
    </Resizable>
  )
}
export default Text