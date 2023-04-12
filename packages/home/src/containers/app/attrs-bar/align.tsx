import React, { useMemo } from 'react'
import IconCheckbox from '../../../components/icon-checkbox/icon-checkbox'

const alignList = [
  'start start',
  'start center',
  'start end',
  'center start',
  'center center',
  'center end',
  'end start',
  'end center',
  'end end',
]

interface AlignProps {
  value: string
  onClick: (value: string) => void
}
export default function Align (props: AlignProps) {
  const align = useMemo(() => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'min-content min-content min-content', gap: 2 }}>
        {alignList.map(value => {
          const checked = value === props.value
          return <IconCheckbox key={value} border checked={checked} padding={6} onClick={() => props.onClick(value)} />
        })}
      </div>
    )
  }, [alignList, props.value])

  return (
    <div className='attr-aligin'>
      {align}
    </div>
  )
}
