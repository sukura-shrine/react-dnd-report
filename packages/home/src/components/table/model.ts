import React from "react"

interface RulerItem {
  type: 'horizontal' | 'vertical'
  loc: any,
  width?: number
  height?: number
}
interface RulerColum extends RulerItem {
  width: number
}

interface RulerRows extends RulerItem {
  height: number
}

export interface ModelState {
  error?: 'string'
  columnLength: number
  rowLength: number
  tableWidth: number
  tableHeight: number
  rulerColumns: RulerColum[]
  rulerRows: RulerRows[]
  selectedGrids: { 
    startX: number, startY: number, endX: number, endY: number
  } | null,
  selectedState: 'selected' | 'unSelected'
}

export interface Action {
  type: string, payload?: any
}

export interface ModelReducer {
  [key: string]: (state: ModelState, payload: any) => ModelState
}

export const initState: ModelState = {
  columnLength: 3,
  rowLength: 3,
  tableWidth: 500,
  tableHeight: 300,
  rulerColumns: [],
  rulerRows: [],
  selectedGrids: null,
  selectedState: 'unSelected',
}

const reducer: ModelReducer = {
  init () {
    return { ...initState }
  },
  createGrid (state) {
    const { columnLength, rowLength, tableWidth } = state;
    const rulerColumns: RulerColum[] = []
    for (let i = 0; i < columnLength; i++) {
      rulerColumns.push({ type: 'horizontal', loc: i + 1, width: tableWidth / columnLength })
    }
    const rulerRows: RulerRows[] = []
    for (let i = 0; i < rowLength; i++) {
      rulerRows.push({ type: 'vertical', loc: i + 1, height: 40 })
    }
    return { ...state, rulerColumns, rulerRows }
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
    let { selectedGrids, selectedState } = state
    const index = payload.index
    const [x, y] = index.split(',').map(v => Number(v))
    
    if (!selectedGrids || selectedState === 'unSelected') {
      return { ...state, selectedGrids: { startX: x, startY: y, endX: x, endY: y }, selectedState: 'selected' }
    }

    selectedGrids = { ...selectedGrids, endX: x, endY: y }
    return { ...state, selectedGrids, selectedState: 'selected' }
  },
  unSelect (state) {
    return { ...state, selectedState: 'unSelected' }
  }
}

export default {
  state: {
    ...initState,
  },
  reducer (state: ModelState, action: Action) {
    const { type, payload } = action
    if (reducer[type]) {
      return reducer[type](state, payload)
    }
    throw new Error(`Unknow type ${type}`)
  },
}
