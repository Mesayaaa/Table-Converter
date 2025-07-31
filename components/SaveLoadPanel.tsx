"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, FolderOpen, Trash2, Calendar, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateId } from "@/lib/utils"
import type { SavedTable } from "@/lib/types"

interface SaveLoadPanelProps {
  onLoadTable: (data: string[][]) => void
  tableData: string[][]
  currentFormat: string
}

export const SaveLoadPanel = ({ onLoadTable, tableData, currentFormat }: SaveLoadPanelProps) => {
  const [savedTables, setSavedTables] = useState<SavedTable[]>([])
  const [tableName, setTableName] = useState("")
  const { toast } = useToast()

  // Load saved tables from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedTables")
    if (saved) {
      try {
        setSavedTables(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading saved tables:", error)
      }
    }
  }, [])

  // Save tables to localStorage
  const saveTablesToStorage = (tables: SavedTable[]) => {
    localStorage.setItem("savedTables", JSON.stringify(tables))
    setSavedTables(tables)
  }

  const handleSaveTable = () => {
    if (!tableName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your table",
        variant: "destructive",
      })
      return
    }

    if (tableData.length === 0) {
      toast({
        title: "No Data",
        description: "No table data to save",
        variant: "destructive",
      })
      return
    }

    const newTable: SavedTable = {
      id: generateId(),
      name: tableName.trim(),
      data: JSON.parse(JSON.stringify(tableData)),
      format: currentFormat,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const updatedTables = [newTable, ...savedTables]
    saveTablesToStorage(updatedTables)
    setTableName("")

    toast({
      title: "Table Saved",
      description: `Table "${newTable.name}" has been saved successfully`,
    })
  }

  const handleLoadTable = (table: SavedTable) => {
    onLoadTable(table.data)
    toast({
      title: "Table Loaded",
      description: `Table "${table.name}" has been loaded successfully`,
    })
  }

  const handleDeleteTable = (tableId: string) => {
    const tableToDelete = savedTables.find((t) => t.id === tableId)
    const updatedTables = savedTables.filter((t) => t.id !== tableId)
    saveTablesToStorage(updatedTables)

    toast({
      title: "Table Deleted",
      description: `Table "${tableToDelete?.name}" has been deleted`,
    })
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Save Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Save className="w-5 h-5" />
            Save Current Table
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter table name..."
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSaveTable()}
            />
            <Button
              onClick={handleSaveTable}
              disabled={!tableName.trim() || tableData.length === 0}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
          {tableData.length > 0 && (
            <div className="text-sm text-gray-600">
              Current table: {tableData.length - 1} rows, {tableData[0]?.length || 0} columns
            </div>
          )}
        </CardContent>
      </Card>

      {/* Load Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderOpen className="w-5 h-5" />
            Saved Tables ({savedTables.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {savedTables.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <div className="text-lg font-medium mb-2">No saved tables</div>
              <div className="text-sm">Save your current table to see it here</div>
            </div>
          ) : (
            <div className="space-y-3">
              {savedTables.map((table) => (
                <div
                  key={table.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{table.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {table.format.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {table.data.length - 1} rows, {table.data[0]?.length || 0} columns
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(table.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleLoadTable(table)}
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Load
                    </Button>
                    <Button
                      onClick={() => handleDeleteTable(table.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
