import { createModel } from "@/utils/create-context"

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
  selectedGrids: { 
    startX: number, startY: number, endX: number, endY: number
  } | null,
  selectedState: SelectedState
}

export const initState: ModelState = {
  columnLength: 3,
  rowLength: 3,
  tableWidth: 0,
  rulerColumns: [],
  rulerRows: [],
  selectedGrids: null,
  selectedState: SelectedState.SELECTED,
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
    return { ...state, rulerColumns, rulerRows, tableWidth }
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
  }
})
