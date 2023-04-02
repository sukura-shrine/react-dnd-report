import React, { useContext, useEffect, useMemo } from 'react'
import { Resizable } from 're-resizable'
import EditInput from '../../components/edit-input'
import { TextProps } from '../../components/types'
import GlobalContext from '../../global-context'
import './style.less'

const Text:React.FC<TextProps> = (props: TextProps) => {
  const { state, dispatch } = useContext(GlobalContext)
  const { fieldsConfig } = state
  const size = useMemo(() => {
    return {
      width: state.reportWidth,
      height: 40,
    }
  }, [state.reportWidth])

  const onClick = () => {
    dispatch({
      type: 'selectItem',
      payload: {
        cid: props.cid
      }
    })
  }
  const onChange = (value: string) => {
    dispatch({
      type: 'updateItem',
      payload: {
        cid: props.cid,
        value
      }
    })
  }

  return (
    <Resizable size={size}>
      <div className='componse-text' style={{ border: "1px solid", cursor: 'move' }} onClick={onClick}>
        <EditInput value={props.value} model={props.model} fieldsConfig={fieldsConfig} onChange={onChange} />
      </div>
    </Resizable>
  )
}
export default Text