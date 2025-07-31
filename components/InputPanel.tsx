"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, Zap, Database, FileSpreadsheet, Code, Table } from "lucide-react"
import { formats } from "@/lib/constants/formats"
import { TemplatePanel } from "./TemplatePanel"
import { SaveLoadPanel } from "./SaveLoadPanel"

interface InputPanelProps {
  selectedFormat: string
  setSelectedFormat: (format: string) => void
  inputData: string
  onInputChange: (value: string) => void
  onSampleData: () => void
  onClear: () => void
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLoadTable: (data: string[][]) => void
  onUseTemplate: (data: string[][]) => void
  tableData: string[][]
}

export const InputPanel = ({
  selectedFormat,
  setSelectedFormat,
  inputData,
  onInputChange,
  onSampleData,
  onClear,
  onFileUpload,
  onLoadTable,
  onUseTemplate,
  tableData,
}: InputPanelProps) => {
  const [activeSection, setActiveSection] = useState<"input" | "templates" | "saved">("input")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileSpreadsheet className="w-4 h-4" />
      case "json":
        return <Code className="w-4 h-4" />
      case "sql":
        return <Database className="w-4 h-4" />
      default:
        return <Table className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant={activeSection === "input" ? "default" : "outline"}
          onClick={() => setActiveSection("input")}
          className="flex-1 sm:flex-none justify-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">Manual Input</span>
          <span className="xs:hidden">Input</span>
        </Button>
        <Button
          variant={activeSection === "templates" ? "default" : "outline"}
          onClick={() => setActiveSection("templates")}
          className="flex-1 sm:flex-none justify-center"
        >
          <Zap className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">Templates</span>
          <span className="xs:hidden">Templates</span>
        </Button>
        <Button
          variant={activeSection === "saved" ? "default" : "outline"}
          onClick={() => setActiveSection("saved")}
          className="flex-1 sm:flex-none justify-center"
        >
          <Database className="w-4 h-4 mr-2" />
          <span className="hidden xs:inline">Saved Tables</span>
          <span className="xs:hidden">Saved</span>
        </Button>
      </div>

      {/* Manual Input Section */}
      {activeSection === "input" && (
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Input Format
            </label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center gap-2">
                      {getFormatIcon(format.value)}
                      <span>{format.label}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {format.extension}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Data Input</label>
            <Textarea
              placeholder={`Paste your ${selectedFormat.toUpperCase()} data here...`}
              value={inputData}
              onChange={(e) => onInputChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button onClick={onSampleData} variant="outline" className="w-full bg-transparent">
              <Zap className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Load Sample</span>
              <span className="sm:hidden">Sample</span>
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Upload File</span>
              <span className="sm:hidden">Upload</span>
            </Button>
            <Button onClick={onClear} variant="outline" className="w-full bg-transparent" disabled={!inputData}>
              <Trash2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.txt,.tsv"
            onChange={onFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Templates Section */}
      {activeSection === "templates" && <TemplatePanel onUseTemplate={onUseTemplate} />}

      {/* Saved Tables Section */}
      {activeSection === "saved" && <SaveLoadPanel onLoadTable={onLoadTable} tableData={tableData} />}
    </div>
  )
}
