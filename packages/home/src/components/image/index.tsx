import React from 'react'
import { Resizable } from 're-resizable'
import { TextProps } from '../../components/types'
import './style.less'

const Image:React.FC<TextProps> = (props: TextProps) => {
  return (
    <Resizable
      defaultSize={{
        width: 320,
        height: 200,
      }}
    >
      <img className='componse-img' src="https://p7.itc.cn/q_70/images03/20230314/047f67118f784ad0b5434d97fb5fe1c9.jpeg" />
    </Resizable>
  )
}
export default Image