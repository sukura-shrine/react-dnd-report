import React, { useState, useRef, useEffect, useMemo, useContext } from 'react'
import { fromEvent, exhaustMap, interval, takeUntil } from 'rxjs'
import { Select } from 'antd'
import { EditInputProps } from '../../components/types'
import { ItemModel } from '../../global-model'
import GlobalContext from '@/global-context'

import './style.less'

const { Option } = Select

const EditInput:React.FC<EditInputProps> = (props) => {
  const { model, fieldsConfig } = props
  const { state, dispatch } = useContext(GlobalContext)

  const ref = useRef<HTMLDivElement>(null)
  const [edited, setEdited] = useState(false)
  const [value, setValue] = useState(props.value)
  
  useEffect(() => {
    if (ref.current) {
      const clicks = fromEvent(ref.current, 'click')
      clicks
        .pipe(
          exhaustMap(() => clicks.pipe(takeUntil(interval(250)))),
        )
        .subscribe((v) => {
          setEdited(true)
        })
    }
  }, [ref])

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const onChange = () => {
    setEdited(false)
    props.onChange && props.onChange(value as string)
  }
  const onSelectChange = (value: string) => {
    setValue(value)
    setEdited(false)
    props.onChange && props.onChange(value as string)
  }

  const children = useMemo(() => {
    if (!edited) {
      return value
    }
    if (model === ItemModel.DATA) {
      return (
        <Select value={value} style={{ minWidth: 120 }} onChange={onSelectChange}>
          {fieldsConfig.map(({ value, label }) => {
            return <Option key={value} value={value}>{label}</Option>
          })}
        </Select>
      )
    }
    return (
      <textarea
        className="text-input"
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onChange}
      />
    )
  }, [edited, value, model, fieldsConfig])

  return (
    <div ref={ref} className='componse-edit-input' style={props.style}>{children}</div>
  )
}
export default EditInput