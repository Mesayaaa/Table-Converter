"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Plus, Minus, ArrowUp, ArrowDown, Edit3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"

interface TableViewProps {
  data: string[][]
  onDataChange: (data: string[][]) => void
  className?: string
  scale?: number
  isEditable?: boolean
}

export const TableView = ({ data, onDataChange, className, scale = 1, isEditable = true }: TableViewProps) => {
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null)
  const [editingValue, setEditingValue] = useState("")
  const [sortColumn, setSortColumn] = useState<number | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
        No data to display
      </div>
    )
  }

  const handleCellEdit = (row: number, col: number, value: string) => {
    const newData = [...data]
    if (!newData[row]) newData[row] = []
    newData[row][col] = value
    onDataChange(newData)
    setEditingCell(null)
  }

  const handleCellDoubleClick = (row: number, col: number) => {
    if (!isEditable) return
    setEditingCell({ row, col })
    setEditingValue(data[row]?.[col] || "")
  }

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === "Enter") {
      handleCellEdit(row, col, editingValue)
    } else if (e.key === "Escape") {
      setEditingCell(null)
    }
  }

  const addRow = (index: number, position: "above" | "below") => {
    const newData = [...data]
    const newRow = new Array(data[0]?.length || 0).fill("")
    const insertIndex = position === "above" ? index : index + 1
    newData.splice(insertIndex, 0, newRow)
    onDataChange(newData)
  }

  const deleteRow = (index: number) => {
    if (index === 0) return // Don't delete header
    const newData = data.filter((_, i) => i !== index)
    onDataChange(newData)
  }

  const addColumn = (index: number, position: "left" | "right") => {
    const newData = data.map((row) => {
      const newRow = [...row]
      const insertIndex = position === "left" ? index : index + 1
      newRow.splice(insertIndex, 0, "")
      return newRow
    })
    onDataChange(newData)
  }

  const deleteColumn = (index: number) => {
    if (data[0]?.length <= 1) return // Don't delete last column
    const newData = data.map((row) => row.filter((_, i) => i !== index))
    onDataChange(newData)
  }

  const sortByColumn = (colIndex: number) => {
    const [header, ...rows] = data
    const newDirection = sortColumn === colIndex && sortDirection === "asc" ? "desc" : "asc"

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

    setSortColumn(colIndex)
    setSortDirection(newDirection)
    onDataChange([header, ...sortedRows])
  }

  return (
    <div
      className={cn("overflow-auto border border-gray-200 rounded-lg bg-white", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            {data[0]?.map((header, colIndex) => (
              <th
                key={colIndex}
                className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors duration-200 relative group"
                onClick={() => sortByColumn(colIndex)}
              >
                <div className="flex items-center justify-between">
                  <span>{header}</span>
                  <div className="flex items-center gap-1">
                    {sortColumn === colIndex && (
                      <Badge variant="secondary" className="text-xs">
                        {sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      </Badge>
                    )}
                    {isEditable && (
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
                          <DropdownMenuItem onClick={() => addColumn(colIndex, "left")}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Column Left
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addColumn(colIndex, "right")}>
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
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => {
            const actualRowIndex = rowIndex + 1
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
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={() => handleCellEdit(actualRowIndex, colIndex, editingValue)}
                            onKeyDown={(e) => handleKeyDown(e, actualRowIndex, colIndex)}
                            className="border-blue-500 focus:border-blue-600 -m-1"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="truncate">{cell}</span>
                            {isEditable && (
                              <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0" />
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </ContextMenuTrigger>
                {isEditable && (
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => addRow(actualRowIndex, "above")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Row Above
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => addRow(actualRowIndex, "below")}>
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
                )}
              </ContextMenu>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
