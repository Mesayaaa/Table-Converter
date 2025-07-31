export interface TableData {
  headers: string[]
  rows: string[][]
}

export interface FormatInfo {
  value: string
  label: string
  extension: string
  mimeType: string
}

export interface SavedTable {
  id: string
  name: string
  data: string[][]
  format: string
  createdAt: number
  updatedAt: number
}

export interface Template {
  id: string
  name: string
  description: string
  data: string[][]
  category: string
}

export type SortDirection = "asc" | "desc" | "none"

export interface CellPosition {
  row: number
  col: number
}

export interface SelectionRange {
  start: CellPosition
  end: CellPosition
}

export interface HistoryState {
  tableData: string[][]
  inputData: string
  timestamp: number
}
