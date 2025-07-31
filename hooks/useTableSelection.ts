"use client"

import { useState, useCallback } from "react"
import type { CellPosition, SelectionRange } from "@/lib/types"

export const useTableSelection = () => {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [lastClickedCell, setLastClickedCell] = useState<CellPosition | null>(null)

  const getCellKey = useCallback((row: number, col: number): string => {
    return `${row}-${col}`
  }, [])

  const selectCell = useCallback(
    (row: number, col: number, isMultiSelect = false) => {
      const cellKey = getCellKey(row, col)

      if (isMultiSelect) {
        setSelectedCells((prev) => {
          const newSet = new Set(prev)
          if (newSet.has(cellKey)) {
            newSet.delete(cellKey)
          } else {
            newSet.add(cellKey)
          }
          return newSet
        })
      } else {
        setSelectedCells(new Set([cellKey]))
      }

      setLastClickedCell({ row, col })
    },
    [getCellKey],
  )

  const selectRange = useCallback(
    (start: CellPosition, end: CellPosition) => {
      const minRow = Math.min(start.row, end.row)
      const maxRow = Math.max(start.row, end.row)
      const minCol = Math.min(start.col, end.col)
      const maxCol = Math.max(start.col, end.col)

      const newSelectedCells = new Set<string>()
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          newSelectedCells.add(getCellKey(row, col))
        }
      }

      setSelectedCells(newSelectedCells)
      setSelectionRange({ start, end })
    },
    [getCellKey],
  )

  const clearSelection = useCallback(() => {
    setSelectedCells(new Set())
    setSelectionRange(null)
    setIsSelecting(false)
    setLastClickedCell(null)
  }, [])

  const isCellSelected = useCallback(
    (row: number, col: number): boolean => {
      return selectedCells.has(getCellKey(row, col))
    },
    [selectedCells, getCellKey],
  )

  return {
    selectedCells,
    selectionRange,
    isSelecting,
    lastClickedCell,
    selectCell,
    selectRange,
    clearSelection,
    isCellSelected,
    setIsSelecting,
  }
}
