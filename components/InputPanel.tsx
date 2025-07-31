"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Sparkles, Trash2, Database, Zap, Download, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formats } from "@/lib/constants/formats"
import { SaveLoadPanel } from "./SaveLoadPanel"
import { TemplatePanel } from "./TemplatePanel"

interface InputPanelProps {
  selectedFormat: string
  setSelectedFormat: (format: string) => void
  inputData: string
  onInputChange: (data: string) => void
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
  const [activeTab, setActiveTab] = useState("input")
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format)
    if (inputData) {
      toast({
        title: "Format Changed",
        description: `Input format changed to ${formats.find((f) => f.value === format)?.label}`,
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target?.result as string
        onInputChange(data)
        toast({
          title: "File Uploaded",
          description: `${file.name} has been loaded successfully`,
        })
      }
      reader.readAsText(file)
    }
  }

  const handleSampleDataClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading
    onSampleData()
    setIsLoading(false)
  }

  return (
    <div className="space-y-8" id="input-section">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-100 to-gray-50 p-1.5 rounded-2xl shadow-inner">
          <TabsTrigger
            value="input"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 font-semibold"
          >
            <FileText className="w-4 h-4 mr-2" />
            Input Data
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 font-semibold"
          >
            <Database className="w-4 h-4 mr-2" />
            Saved Tables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-8 mt-8">
          {/* Format Selection */}
          <div className="space-y-4">
            <label className="text-lg font-bold text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              Choose Input Format
            </label>
            <Select value={selectedFormat} onValueChange={handleFormatChange}>
              <SelectTrigger className="bg-white border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all duration-300 h-14 text-base font-medium shadow-sm hover:shadow-md">
                <SelectValue placeholder="Select input format" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-200 shadow-2xl rounded-xl">
                {formats.map((format) => (
                  <SelectItem
                    key={format.value}
                    value={format.value}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs font-bold px-2 py-1">
                        {format.extension.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{format.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleSampleDataClick}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-14 text-base font-semibold"
            >
              {isLoading ? <div className="spinner mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
              Load Sample Data
            </Button>

            <Button
              onClick={handleFileClick}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-14 text-base font-semibold"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload File
            </Button>

            <Button
              onClick={onClear}
              disabled={!inputData}
              variant="outline"
              className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 hover:scale-105 h-14 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear All
            </Button>
          </div>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFileUpload}
            accept=".csv,.tsv,.json,.html,.xml,.yaml,.yml,.sql,.tex,.txt,.md"
            className="hidden"
          />

          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
              isDragOver
                ? "border-blue-400 bg-blue-50 scale-105"
                : inputData
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                {selectedFormat.toUpperCase()} Data
              </label>
              <Textarea
                value={inputData}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={`Paste your ${selectedFormat.toUpperCase()} data here, drag & drop a file, or use sample data...`}
                className="min-h-[300px] bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-300 font-mono text-sm resize-none shadow-inner custom-scrollbar"
              />
            </div>

            {/* Drag overlay */}
            {isDragOver && (
              <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Download className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-bold text-blue-700">Drop your file here</p>
                </div>
              </div>
            )}
          </div>

          {/* Format Info */}
          {selectedFormat && (
            <Card className="card-enhanced animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      Selected Format: {formats.find((f) => f.value === selectedFormat)?.label}
                    </h3>
                    <p className="text-gray-600">Ready to process your {selectedFormat.toUpperCase()} data</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 ml-auto">
                    .{formats.find((f) => f.value === selectedFormat)?.extension}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-8">
          <TemplatePanel onUseTemplate={onUseTemplate} />
        </TabsContent>

        <TabsContent value="saved" className="mt-8">
          <SaveLoadPanel onLoadTable={onLoadTable} tableData={tableData} currentFormat={selectedFormat} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
