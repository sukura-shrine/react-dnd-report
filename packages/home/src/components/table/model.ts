import React from "react"

interface RulerColum {
  loc: any,
  width: number
}

interface RulerRows {
  loc: any,
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
  rowLength: 4,
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
  createColumns (state) {
    const { columnLength, tableWidth } = state;
    const rulerColumns = []
    for (let i = 0; i < columnLength; i++) {
      rulerColumns.push({ loc: i + 1, width: tableWidth / columnLength })
    }
    return { ...state, rulerColumns }
  },
  updateColumn (state, payload: { loc: any, width: number }) {
    const { rulerColumns } = state
    const item = rulerColumns.find(item => item.loc === payload.loc)
    if (item && payload.width) {
      item.width = payload.width
      return { ...state, rulerColumns: [...rulerColumns] }
    }
    return state
  },
  selectGrid (state, payload: { index: string }) {
    let { selectedGrids, selectedState } = state
    const index = payload.index
    const [x, y] = index.split(',').map(v => Number(v))
    
    console.log(selectedGrids, selectedState)
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
