"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Save, Database, Trash2, Calendar, FileText, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SavedTable {
  id: string
  name: string
  data: string[][]
  savedAt: string
  rowCount: number
  columnCount: number
}

interface SaveLoadPanelProps {
  onLoadTable: (data: string[][]) => void
  tableData: string[][]
}

export const SaveLoadPanel = ({ onLoadTable, tableData }: SaveLoadPanelProps) => {
  const [savedTables, setSavedTables] = useState<SavedTable[]>([])
  const [tableName, setTableName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Load saved tables from localStorage on component mount
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

  // Save tables to localStorage whenever savedTables changes
  useEffect(() => {
    localStorage.setItem("savedTables", JSON.stringify(savedTables))
  }, [savedTables])

  const handleSaveTable = () => {
    if (!tableData || tableData.length === 0) {
      toast({
        title: "No Data to Save",
        description: "Please input some table data before saving.",
        variant: "destructive",
      })
      return
    }

    if (!tableName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your table.",
        variant: "destructive",
      })
      return
    }

    const newTable: SavedTable = {
      id: Date.now().toString(),
      name: tableName.trim(),
      data: tableData,
      savedAt: new Date().toISOString(),
      rowCount: tableData.length,
      columnCount: tableData[0]?.length || 0,
    }

    setSavedTables((prev) => [newTable, ...prev])
    setTableName("")

    toast({
      title: "Table Saved! 💾",
      description: `"${newTable.name}" has been saved successfully.`,
    })
  }

  const handleLoadTable = (table: SavedTable) => {
    onLoadTable(table.data)
    toast({
      title: "Table Loaded! 📊",
      description: `"${table.name}" has been loaded successfully.`,
    })
  }

  const handleDeleteTable = (id: string) => {
    const table = savedTables.find((t) => t.id === id)
    setSavedTables((prev) => prev.filter((t) => t.id !== id))

    toast({
      title: "Table Deleted",
      description: `"${table?.name}" has been deleted.`,
    })
  }

  const filteredTables = savedTables.filter((table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Save Current Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Save className="w-5 h-5" />
            Save Current Table
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter table name..."
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSaveTable}
              disabled={!tableData || tableData.length === 0}
              className="w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Table
            </Button>
          </div>
          {tableData && tableData.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Current table: {tableData.length} rows × {tableData[0]?.length || 0} columns
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Tables */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="w-5 h-5" />
              Saved Tables ({savedTables.length})
            </CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTables.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {savedTables.length === 0 ? (
                <div className="space-y-2">
                  <Database className="w-12 h-12 mx-auto opacity-50" />
                  <p>No saved tables yet</p>
                  <p className="text-sm">Save your current table to access it later</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Search className="w-12 h-12 mx-auto opacity-50" />
                  <p>No tables match your search</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTables.map((table) => (
                <Card key={table.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                          <h3 className="font-semibold truncate">{table.name}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {table.rowCount} rows
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {table.columnCount} columns
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">{formatDate(table.savedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button onClick={() => handleLoadTable(table)} size="sm" className="w-full sm:w-auto">
                          Load
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Table</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{table.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTable(table.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
