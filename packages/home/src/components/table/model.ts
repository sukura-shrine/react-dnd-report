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
  length: number
  tableWidth: number
  tableHeight: number
  rulerColumns: RulerColum[]
  rulerRows: RulerRows[]
}

export interface Action {
  type: string, payload: any
}

export interface ModelReducer {
  [key: string]: (state: ModelState, payload: any) => ModelState
}

export const initState: ModelState = {
  length: 3,
  tableWidth: 500,
  tableHeight: 300,
  rulerColumns: [],
  rulerRows: [],
}

const reducer: ModelReducer = {
  init () {
    return { ...initState }
  },
  createColumns (state, payload: { length: number }) {
    const { tableWidth } = state;
    const rulerColumns = []
    for (let i = 0; i < payload.length; i++) {
      rulerColumns.push({ loc: i + 1, width: tableWidth / payload.length })
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
