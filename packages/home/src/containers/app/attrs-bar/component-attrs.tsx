import React, { useContext, useMemo } from 'react'
import { ItemConfig, ComponentType } from '../../../global-model'
import GlobalContext from '../../../global-context'
import Text from './text-attrs'
import Table from './table-attrs'
import HorizontalLine from './horizontal-line-attrs'

import './style.less'

const componentMap = {
  [ComponentType.TEXT]: Text,
  [ComponentType.TABLE]: Table,
  [ComponentType.HORIZONTAL_LINE]: HorizontalLine,
}

const Attrs: React.FC = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const { selectedItem } = state

  const onChange = (key: string, value: any) => {
    dispatch({
      type: 'updateItemConfig',
      payload: { key, value }
    })
  }

  const children = useMemo(() => {
    if (!selectedItem) {
      return null
    }
    const { type } = selectedItem
    const Component = componentMap[type!]
    return <Component selectedItem={selectedItem} onChange={onChange} />
  }, [selectedItem])

  return (
    <div className="attrs">
      {children}
    </div>
  )
}

export default Attrs
