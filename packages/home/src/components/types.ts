export interface BoxData {
  width: number
  height: number
  x?: number
  y?: number
  sequence?: number
}
export interface TableBoxData extends BoxData {
  columnsSize: { [key: string]: number }[]
	rowsSize: { [key: string]: number }[]
}
export interface CellTextData {
  x: string
  y: string
  width: number
  height: number
  color: string
  backgroundColor: string
  value: string
}
export interface RowData {
  [columnName: string]: string
}
export interface DataMapConfig {
  [columnName: string]: string
}
export interface TextProps {
  className?: string
  position?: string
  flexible?: boolean
  color?: string
  backgroundColor?: string
  align?: string
  fontSize?: string
  width?: number
  height?: number
  x?: number
  y?: number
  value?: string
  editable?: boolean
  controlled?: boolean
  onChange?: () => void
  onClick?: () => void
}