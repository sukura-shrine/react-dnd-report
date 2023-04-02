import React from "react"
import { ItemModel, FieldConfig } from '../global-model'
import { ModelState } from './table/model'

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
  cid: string
  className?: string
  model?: ItemModel
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
  onChange?: (cid: string, state: TextProps) => void
  onClick?: () => void
}

export interface TableBodyProps {
  cid: string
  onChange?: (cid: string, state: ModelState) => void
}

export interface TableHeaderProps {
  
}

export interface RulerProps {
  vertical?: boolean
  children?: React.ReactNode
}

export interface EditInputProps {
  model?: ItemModel
  value?: string
  fieldsConfig: FieldConfig[]
  onChange?: (value: string) => void
}
