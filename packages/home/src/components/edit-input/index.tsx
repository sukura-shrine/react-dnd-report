import React, { useState, useRef, useEffect, useMemo } from 'react'
import { fromEvent, exhaustMap, interval, takeUntil } from 'rxjs'
import { EditInputProps } from '@/components/types'
import './style.css'

const EditInput:React.FC<EditInputProps> = (props: EditInputProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [edited, setEdited] = useState(false)
  const [value, setValue] = useState('')
  
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

  const children = useMemo(() => {
    if (edited) {
      return (
        <textarea
          className="text-input"
          autoFocus
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setEdited(false)}
        />
      )
    } else {
      return value
    }
  }, [edited, value])

  return (
    <div ref={ref} className='componse-edit-input'>{children}</div>
  )
}
export default EditInput