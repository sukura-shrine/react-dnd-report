import { createModel } from "../../utils/create-context"

export interface RulerItem {
  type: 'horizontal' | 'vertical'
  loc: any,
  width?: number
  height?: number
}

export interface RulerItem {
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

enum SelectedState {
  SELECTED = 'selected',
  UNSELECTED = 'unSelected'
}

export interface ModelState {
  error?: 'string'
  columnLength: number
  rowLength: number
  tableWidth: number
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
  tableWidth: 0,
  rulerColumns: [],
  rulerRows: [],
  values: [],
  selectedGrids: null,
  selectedState: SelectedState.SELECTED,
  selectedLeftRuler: null,
}

export default createModel(initState, {
  init (state) {
    return { ...initState }
  },
  createGrid (state, payload: { reportWidth: number }) {
    const { columnLength, rowLength } = state;
    const tableWidth = payload.reportWidth - 10 - columnLength - 1
    const rulerColumns: RulerColum[] = []
    for (let i = 0; i < columnLength; i++) {
      rulerColumns.push({ type: 'horizontal', loc: i + 1, width: tableWidth / columnLength })
    }
    const rulerRows: RulerRows[] = []
    for (let i = 0; i < rowLength; i++) {
      rulerRows.push({ type: 'vertical', loc: i + 1, height: 40 })
    }
    const length = rulerColumns.length * rulerRows.length
    const values = [...Array(length)].map((v, i) => '')
    return { ...state, rulerColumns, rulerRows, tableWidth, columnLength, values }
  },
  addColumn (state) {
    const { tableWidth, rulerColumns } = state
    const width = tableWidth / (rulerColumns.length + 1)
    rulerColumns.forEach(item => item.width = width)
    const columns: RulerColum[] = [...rulerColumns, { type: 'horizontal', loc: rulerColumns.length, width }]
    
    return { ...state, rulerColumns: columns, columnLength: columns.length  }
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
    let { selectedGrids, selectedState } = state
    const index = payload.index
    const [x, y] = index.split(',').map(v => Number(v))
    
    if (!selectedGrids || selectedState === SelectedState.UNSELECTED) {
      return { ...state, selectedGrids: { startX: x, startY: y, endX: x, endY: y }, selectedState: SelectedState.SELECTED }
    }

    selectedGrids = { ...selectedGrids, endX: x, endY: y }
    return { ...state, selectedGrids, selectedState: SelectedState.SELECTED }
  },
  unSelect (state) {
    return { ...state, selectedState: SelectedState.UNSELECTED }
  },

  selectLeftRuler (state, payload: { loc: any }) {
    return { ...state, selectedLeftRuler: payload.loc }
  },

  editItem (state, payload: { dataIndex: string, value: string }) {
    const { dataIndex, value } = payload
    const [x, y] = dataIndex.split(',').map(v => Number(v))
    const index = y * state.rowLength + x
    state.values[index] = value
    
    return state
  },
})
