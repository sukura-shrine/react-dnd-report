import { createModel } from "./utils/create-context"
import { ModelState as TableModelState, RulerColum, RulerRows } from './components/table/model'

export enum ItemModel {
  DATA = 'data',
  INPUT = 'input',
}
export enum ComponentType {
  TEXT = 'text',
  // IMAGE = 'image',
  TABLE = 'table',
}

export interface ItemConfig {
  cid: string
  sequence: number
  type?: ComponentType
  width?: number
  height?: number
  model?: ItemModel
  keys?: any[]
  value?: string
  fontSize?: number
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  borderWidth?: string
  borderStyle?: string
  borderColor?: string
  placeItems?: string
  dataGroup?: string
}

export interface TableItemConfig extends ItemConfig {
  values: string[]
  tableWidth: number,
  rulerColumns: RulerColum[]
  rulerRows: RulerRows[],
}

export interface FieldConfig {
  key: string, title: string
}

export interface ModelState {
  reportWidth: number
  fieldsConfig: FieldConfig[]
  reportConfig: {
    children: (ItemConfig | TableItemConfig)[]
  }
  selectedItem: ItemConfig | null
}

export const initState: ModelState = {
  reportWidth: 0,
  fieldsConfig: [
  ],
  reportConfig: {
    children: [
    ],
  },
  selectedItem: null
}

export default createModel(initState, {
  init () {
    return { ...initState }
  },
  reportInit (state, payload) {
    return { ...state, ...payload.config }
  },
  updateReportSize (state, payload: { reportWidth: number }) {
    return { ...state, reportWidth: payload.reportWidth }
  },
  addItem (state, payload: { type: ComponentType }) {
    const { reportWidth, reportConfig } = state
    const item: ItemConfig = {
      cid: String(Date.now()),
      sequence: reportConfig.children.length,
      type: payload.type,
      width: reportWidth,
      model: ItemModel.INPUT,
      fontSize: 14,
    }
    if (item.type === ComponentType.TEXT) {
      item.height = 40
    }
    reportConfig.children.push(item)
    
    return { ...state, reportConfig: { ...reportConfig } }
  },
  selectItem (state, payload: { cid: string }) {
    if (state.selectedItem?.cid !== payload.cid) {
      const item = state.reportConfig.children.find(item => item.cid === payload.cid)
      if (item) {
        return { ...state, selectedItem: item }
      }
    }
    return state
  },
  updateItemConfig (state, payload: { itemConfig: ItemConfig }) {
    const { reportConfig } = state
    const { itemConfig } = payload
    const children = reportConfig.children.filter(item => item.cid !== itemConfig.cid)
    children.push(itemConfig)
    children.sort((a, b) => a.sequence - b.sequence)
    reportConfig.children = children
    
    return { ...state, reportConfig: { ...reportConfig }, selectedItem: itemConfig }
  },
  updateItem (state, payload: ItemConfig) {
    const { reportConfig } = state
    const { cid, ...args } = payload
    const item = reportConfig.children.find(item => item.cid === cid)
    // 更新值但是不刷新页面，组件状态在组件内部维护
    if (item) {
      Object.keys(args).forEach((key) => {
        //@ts-ignore
        item[key] = args[key]
      })
    }
    return state
  },
  updateTableItem (state, payload: { cid: string, tableState: TableModelState }) {
    const { cid, tableState } = payload
    const { rulerColumns, rulerRows, values, tableWidth } = tableState
    const item = state.reportConfig.children.find(item => item.cid === cid) as TableItemConfig
    if (!item) {
      return state
    }
    item.rulerColumns = rulerColumns
    item.rulerRows = rulerRows
    item.values = values
    item.tableWidth = tableWidth
    return state
  },
})
