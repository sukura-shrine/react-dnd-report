import React, { useContext, useState, useMemo } from 'react'
import { Resizable } from 're-resizable'
import EditInput from '../../components/edit-input'
import { TextProps } from '../../components/types'
import GlobalContext from '../../global-context'
import './style.less'

const Text: React.FC<TextProps> = (props) => {
  const { state, dispatch } = useContext(GlobalContext)
  const { fieldsConfig } = state

  const [size, setSize] = useState({
    width: props.width || 0,
    height: props.height || 0,
  })

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
  // @ts-ignore
  const onResizeStop = (e, direction, ref, d) => {
    const newSize = {
      width: size.width + d.width,
      height: size.height + d.height
    }
    dispatch({
      type: 'updateItem',
      payload: {
        cid: props.cid,
        ...newSize
      }
    })
    setSize(newSize)
  }

  const styles = useMemo(() => {
    const { fontSize, fontWeight, fontStyle, textDecoration } = props
    return {
      border: '1px solid',
      borderColor: state.selectedItem?.cid === props.cid ? '#a3d8fb' : undefined,
      cursor: 'move',
      fontSize, fontWeight, fontStyle, textDecoration,
    }
  }, [props, state.selectedItem])

  return (
    <Resizable size={size} onResizeStop={onResizeStop}>
      <div className='componse-text' style={styles} onClick={onClick}>
        <EditInput value={props.value} model={props.model} fieldsConfig={fieldsConfig} onChange={onChange} />
      </div>
    </Resizable>
  )
}
export default Text