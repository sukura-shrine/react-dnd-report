import { createModel } from "../../utils/create-context"
import { TableItemConfig } from "@/global-model"

export interface RulerItem {
  type: 'horizontal' | 'vertical'
  loc: any,
  width?: number
  height?: number
}

export interface RulerColum extends RulerItem {
  width: number
}

export interface RulerRows extends RulerItem {
  height: number
}

enum SelectedState {
  SELECTED = 'selected',
  UNSELECTED = 'unSelected'
}

export interface ModelState {
  x?: number,
  y?: number,
  error?: 'string'
  columnLength: number
  rowLength: number
  width: number
  rulerColumns: RulerColum[]
  rulerRows: RulerRows[]
  values: string[]
  selectedGrids: { 
    startX: number, startY: number, endX: number, endY: number
  } | null,
  selectedState: SelectedState
  selectedLeftRuler: any,
}

export const initState: ModelState = {
  columnLength: 3,
  rowLength: 1,
  width: 0,
  rulerColumns: [],
  rulerRows: [],
  values: [],
  selectedGrids: null,
  selectedState: SelectedState.SELECTED,
  selectedLeftRuler: null,
}

export default createModel(initState, {
  tableInit (state, payload: ModelState) {
    if (!payload) {
      return { ...initState }
    }
    const { x, y, rulerColumns, rulerRows, values, width } = payload
    const columnLength = rulerColumns.length
    const rowLength = rulerRows.length
    const item = {
      x: x || 0, y: y || 0,
      columnLength, rowLength,
      rulerColumns, rulerRows, values,
    }
    if (width) {
      // @ts-ignore
      item.width = width
    }

    return { ...state, ...item }
  },

  createGrid (state, payload: { width: number, x: number, y: number, parentConfig: TableItemConfig }) {
    const { columnLength, rowLength } = state;
    const width = payload.width - 10 - columnLength - 1

    const rulerColumns: RulerColum[] = []
    if (payload.parentConfig) {
      payload.parentConfig.rulerColumns.forEach(item => {
        rulerColumns.push({ ...item })
      })
    } else {
      for (let i = 0; i < columnLength; i++) {
        rulerColumns.push({ type: 'horizontal', loc: i + 1, width: width / columnLength })
      }
    }
    
    const rulerRows: RulerRows[] = []
    for (let i = 0; i < rowLength; i++) {
      rulerRows.push({ type: 'vertical', loc: i + 1, height: 40 })
    }
    
    const length = rulerColumns.length * rulerRows.length
    const values = [...Array(length)].map((v, i) => '')
    
    return { ...state, rulerColumns, rulerRows, width, columnLength, values, x: payload.x, y: payload.y }
  },

  addColumn (state) {
    const { width: tableWidth, rulerColumns, columnLength, values } = state
    const width = tableWidth / (rulerColumns.length + 1)

    const columns: RulerColum[] = [...rulerColumns, { type: 'horizontal', loc: rulerColumns.length, width }]

    const list: string[] = []
    values.forEach((val, i) => {
      list.push(val)
      if ((i + 1) % columnLength === 0) {
        list.push('')
      }
    })
    
    return { ...state, rulerColumns: columns, columnLength: columns.length, values: list  }
  },

  addRow (state) {
    const { rulerRows, columnLength, values } = state
    const rows: RulerRows[] = [...rulerRows, { type: 'vertical', loc: rulerRows.length, height: 40 }]
    values.push.apply(values, [...Array(columnLength)].map(v => ''))
    
    return { ...state, rulerRows: rows, rowLength: rows.length }
  },

  updateColumn (state, payload: RulerItem) {
    const { rulerColumns } = state
    const { loc, width } = payload
    const item = rulerColumns.find(item => item.loc === loc)
    if (item && width) {
      item.width = width
      return { ...state, rulerColumns: [...rulerColumns] }
    }
    return state
  },

  updateRow (state, payload: RulerItem) {
    const { rulerRows } = state
    const { loc, height } = payload
    const item = rulerRows.find(item => item.loc === loc)
    if (item && height) {
      item.height = height
      return { ...state, rulerRows: [...rulerRows] }
    }
    return state
  },

  selectGrid (state, payload: { index: string }) {
    let { selectedGrids, selectedState, columnLength } = state
    const index = Number(payload.index)

    const yIndex = Math.ceil((index + 1) / columnLength) - 1
    const xIndex = index - yIndex * columnLength
    
    if (!selectedGrids || selectedState === SelectedState.UNSELECTED) {
      return { ...state, selectedGrids: { startX: xIndex, startY: yIndex, endX: xIndex, endY: yIndex }, selectedState: SelectedState.SELECTED }
    }

    selectedGrids = { ...selectedGrids, endX: xIndex, endY: yIndex }
    return { ...state, selectedGrids, selectedState: SelectedState.SELECTED }
  },

  unSelect (state) {
    return { ...state, selectedState: SelectedState.UNSELECTED }
  },

  selectLeftRuler (state, payload: { loc: any }) {
    return { ...state, selectedLeftRuler: payload.loc }
  },

  editItem (state, payload: { dataIndex: number, value: string }) {
    const { dataIndex, value } = payload
    state.values[dataIndex] = value
    
    return state
  },

  updatePosition (state, payload: { x: number, y: number }) {
    return { ...state, ...payload }
  },
})
