"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Undo2, Redo2, ZoomIn, ZoomOut, Maximize2, X, Plus, Minus, Edit3, MoreVertical } from "lucide-react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface PreviewPanelProps {
  tableData: string[][]
  setTableData: (data: string[][]) => void
  updateInputData: (data: string[][]) => string
  saveToHistory: (tableData: string[][], inputData: string) => void
  handleUndo: () => void
  handleRedo: () => void
  historyIndex: number
  historyLength: number
  isTableExpanded: boolean
  onTableExpand: () => void
  inputData: string
  selectedFormat: string
  parseInputData: (data: string, format: string) => string[][]
}

export const PreviewPanel = ({
  tableData,
  setTableData,
  updateInputData,
  saveToHistory,
  handleUndo,
  handleRedo,
  historyIndex,
  historyLength,
  isTableExpanded,
  onTableExpand,
  inputData,
  selectedFormat,
  parseInputData,
}: PreviewPanelProps) => {
  const [filterText, setFilterText] = useState("")
  const [tableScale, setTableScale] = useState(1)
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [sortColumn, setSortColumn] = useState<number | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | "none">("none")

  const editInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Filter data based on search text
  const filteredData = tableData.filter((row, index) => {
    if (index === 0) return true // Always show header
    if (!filterText) return true
    return row.some((cell) => cell.toLowerCase().includes(filterText.toLowerCase()))
  })

  // Statistics
  const stats = {
    totalRows: tableData.length > 0 ? tableData.length - 1 : 0,
    totalColumns: tableData.length > 0 ? tableData[0]?.length || 0 : 0,
    totalCells: tableData.length > 0 ? (tableData.length - 1) * (tableData[0]?.length || 0) : 0,
    filteredRows: filteredData.length > 0 ? filteredData.length - 1 : 0,
  }

  // Handle cell editing
  const handleCellDoubleClick = (row: number, col: number) => {
    setEditingCell({ row, col })
    setEditingValue(tableData[row]?.[col] || "")
  }

  const handleCellEdit = (row: number, col: number, value: string) => {
    const newData = [...tableData]
    if (!newData[row]) newData[row] = []
    newData[row][col] = value
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)
    setEditingCell(null)

    toast({
      title: "Cell Updated",
      description: `Cell at row ${row + 1}, column ${col + 1} has been updated`,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === "Enter") {
      handleCellEdit(row, col, editingValue)
    } else if (e.key === "Escape") {
      setEditingCell(null)
    }
  }

  // Context menu actions
  const addRowAbove = (rowIndex: number) => {
    const newData = [...tableData]
    const newRow = new Array(newData[0]?.length || 0).fill("")
    newData.splice(rowIndex, 0, newRow)
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Row Added",
      description: `New row added above row ${rowIndex + 1}`,
    })
  }

  const addRowBelow = (rowIndex: number) => {
    const newData = [...tableData]
    const newRow = new Array(newData[0]?.length || 0).fill("")
    newData.splice(rowIndex + 1, 0, newRow)
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Row Added",
      description: `New row added below row ${rowIndex + 1}`,
    })
  }

  const addColumnLeft = (colIndex: number) => {
    const newData = tableData.map((row) => {
      const newRow = [...row]
      newRow.splice(colIndex, 0, "")
      return newRow
    })
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Column Added",
      description: `New column added to the left of column ${colIndex + 1}`,
    })
  }

  const addColumnRight = (colIndex: number) => {
    const newData = tableData.map((row) => {
      const newRow = [...row]
      newRow.splice(colIndex + 1, 0, "")
      return newRow
    })
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Column Added",
      description: `New column added to the right of column ${colIndex + 1}`,
    })
  }

  const deleteRow = (rowIndex: number) => {
    if (rowIndex === 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete the header row",
        variant: "destructive",
      })
      return
    }

    const newData = tableData.filter((_, index) => index !== rowIndex)
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Row Deleted",
      description: `Row ${rowIndex + 1} has been deleted`,
    })
  }

  const deleteColumn = (colIndex: number) => {
    if (tableData[0]?.length <= 1) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete the last column",
        variant: "destructive",
      })
      return
    }

    const newData = tableData.map((row) => row.filter((_, index) => index !== colIndex))
    setTableData(newData)
    const newInputData = updateInputData(newData)
    saveToHistory(newData, newInputData)

    toast({
      title: "Column Deleted",
      description: `Column ${colIndex + 1} has been deleted`,
    })
  }

  // Sorting
  const handleSort = (colIndex: number) => {
    let newDirection: "asc" | "desc" | "none" = "asc"

    if (sortColumn === colIndex) {
      if (sortDirection === "asc") newDirection = "desc"
      else if (sortDirection === "desc") newDirection = "none"
      else newDirection = "asc"
    }

    setSortColumn(colIndex)
    setSortDirection(newDirection)

    if (newDirection === "none") {
      // Reset to original order
      const originalData = parseInputData(inputData, selectedFormat)
      setTableData(originalData)
      return
    }

    const [header, ...rows] = tableData
    const sortedRows = [...rows].sort((a, b) => {
      const aVal = a[colIndex] || ""
      const bVal = b[colIndex] || ""

      // Try to parse as numbers
      const aNum = Number.parseFloat(aVal)
      const bNum = Number.parseFloat(bVal)

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return newDirection === "asc" ? aNum - bNum : bNum - aNum
      }

      // String comparison
      return newDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })

    setTableData([header, ...sortedRows])
  }

  // Zoom controls
  const zoomIn = () => {
    setTableScale((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setTableScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  const resetZoom = () => {
    setTableScale(1)
  }

  useEffect(() => {
    if (editingCell && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editingCell])

  if (tableData.length === 0) {
    return (
      <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-lg mb-2">No data to preview</div>
          <div className="text-gray-500 text-sm">Please input some data first</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${isTableExpanded ? "h-full flex flex-col" : ""}`}>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Filter table data..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border-gray-200 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        {/* History Controls */}
        <div className="flex items-center gap-1">
          <Button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            size="sm"
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleRedo}
            disabled={historyIndex >= historyLength - 1}
            size="sm"
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Button
            onClick={zoomOut}
            disabled={tableScale <= 0.5}
            size="sm"
            variant="outline"
            className="hover:bg-green-50 hover:border-green-300 bg-transparent"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            onClick={resetZoom}
            size="sm"
            variant="outline"
            className="hover:bg-green-50 hover:border-green-300 min-w-[60px] bg-transparent"
          >
            {Math.round(tableScale * 100)}%
          </Button>
          <Button
            onClick={zoomIn}
            disabled={tableScale >= 2}
            size="sm"
            variant="outline"
            className="hover:bg-green-50 hover:border-green-300"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        {/* Expand Toggle */}
        <Button
          onClick={onTableExpand}
          size="sm"
          variant="outline"
          className="hover:bg-purple-50 hover:border-purple-300 bg-transparent"
        >
          {isTableExpanded ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Close
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 mr-2" />
              Expand
            </>
          )}
        </Button>
      </div>

      {/* Statistics */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{stats.totalRows}</Badge>
          <span>Rows</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{stats.totalColumns}</Badge>
          <span>Columns</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{stats.totalCells}</Badge>
          <span>Cells</span>
        </div>
        {filterText && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {stats.filteredRows}
            </Badge>
            <span>Filtered Rows</span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className={`${isTableExpanded ? "flex-1 overflow-hidden" : ""}`}>
        <div
          className={`overflow-auto border border-gray-200 rounded-lg bg-white shadow-sm ${
            isTableExpanded ? "h-full" : "max-h-[500px]"
          }`}
          style={{ transform: `scale(${tableScale})`, transformOrigin: "top left" }}
        >
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {filteredData[0]?.map((header, colIndex) => (
                  <th
                    key={colIndex}
                    className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors duration-200 relative group"
                    onClick={() => handleSort(colIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{header}</span>
                      <div className="flex items-center gap-1">
                        {sortColumn === colIndex && (
                          <Badge variant="secondary" className="text-xs">
                            {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : ""}
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => addColumnLeft(colIndex)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Column Left
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => addColumnRight(colIndex)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Column Right
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteColumn(colIndex)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4 mr-2" />
                              Delete Column
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(1).map((row, rowIndex) => {
                const actualRowIndex = tableData.findIndex((r) => r === row)
                return (
                  <ContextMenu key={actualRowIndex}>
                    <ContextMenuTrigger asChild>
                      <tr className="hover:bg-gray-50 transition-colors duration-200 group">
                        {row.map((cell, colIndex) => (
                          <td
                            key={colIndex}
                            className="border border-gray-200 px-4 py-3 relative group/cell cursor-pointer"
                            onDoubleClick={() => handleCellDoubleClick(actualRowIndex, colIndex)}
                          >
                            {editingCell?.row === actualRowIndex && editingCell?.col === colIndex ? (
                              <Input
                                ref={editInputRef}
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onBlur={() => handleCellEdit(actualRowIndex, colIndex, editingValue)}
                                onKeyDown={(e) => handleKeyDown(e, actualRowIndex, colIndex)}
                                className="border-blue-500 focus:border-blue-600 -m-1"
                              />
                            ) : (
                              <div className="flex items-center justify-between">
                                <span className="truncate">{cell}</span>
                                <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0" />
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => addRowAbove(actualRowIndex)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Row Above
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => addRowBelow(actualRowIndex)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Row Below
                      </ContextMenuItem>
                      <ContextMenuItem
                        onClick={() => deleteRow(actualRowIndex)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Delete Row
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
