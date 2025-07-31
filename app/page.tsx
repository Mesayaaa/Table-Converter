"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Zap, FileText, X, Sparkles } from "lucide-react"

import { Header } from "@/components/Header"
import { StepBar } from "@/components/StepBar"
import { InputPanel } from "@/components/InputPanel"
import { HowToUse } from "@/components/HowToUse"
import { PreviewPanel } from "@/components/PreviewPanel"
import { OutputPanel } from "@/components/OutputPanel"

import { useTableParsers } from "@/hooks/useTableParsers"
import { useTableHistory } from "@/hooks/useTableHistory"
import { useTableSelection } from "@/hooks/useTableSelection"

import { sampleData } from "@/lib/constants/sampleData"
import { formats } from "@/lib/constants/formats"
import { generateOutput } from "@/lib/formatGenerators"

export default function TableConverter() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState("csv")
  const [inputData, setInputData] = useState("")
  const [activeTab, setActiveTab] = useState("input")
  const [outputFormat, setOutputFormat] = useState("csv")
  const [tableData, setTableData] = useState<string[][]>([])
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const [isTableExpanded, setIsTableExpanded] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const { parseInputData } = useTableParsers()
  const { saveToHistory, handleUndo, handleRedo, clearHistory, historyIndex, history, isUndoRedoOperation } =
    useTableHistory()
  const { clearSelection } = useTableSelection()

  const updateInputData = (data: string[][]) => {
    const newInputData = data.map((row) => row.join(",")).join("\n")
    setInputData(newInputData)
    return newInputData
  }

  const handleSampleData = () => {
    const sample = sampleData[selectedFormat as keyof typeof sampleData] || sampleData.csv
    const newTableData = parseInputData(sample, selectedFormat)
    setInputData(sample)
    setCurrentStep(2)
    setTableData(newTableData)
    saveToHistory(newTableData, sample)
  }

  const handleClear = () => {
    setInputData("")
    setTableData([])
    setCurrentStep(1)
    clearSelection()
    clearHistory()
    setIsTableExpanded(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result as string
        const newTableData = parseInputData(data, selectedFormat)
        setInputData(data)
        setCurrentStep(2)
        setTableData(newTableData)
        saveToHistory(newTableData, data)
      }
      reader.readAsText(file)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "preview" && inputData) {
      setCurrentStep(3)
    }
  }

  const handleInputChange = (value: string) => {
    const newTableData = value ? parseInputData(value, selectedFormat) : []
    setInputData(value)
    if (value) {
      setCurrentStep(2)
      setTableData(newTableData)
    } else {
      setTableData([])
      setCurrentStep(1)
    }
    if (!isUndoRedoOperation) {
      saveToHistory(newTableData, value)
    }
  }

  const handleLoadTable = (data: string[][]) => {
    setTableData(data)
    const newInputData = updateInputData(data)
    setInputData(newInputData)
    setCurrentStep(2)
    setActiveTab("preview")
    saveToHistory(data, newInputData)
  }

  const handleUseTemplate = (data: string[][]) => {
    setTableData(data)
    const newInputData = updateInputData(data)
    setInputData(newInputData)
    setCurrentStep(2)
    setActiveTab("preview")
    saveToHistory(data, newInputData)
  }

  const handleCopy = async (format: string) => {
    const output = generateOutput(format, tableData)
    try {
      await navigator.clipboard.writeText(output)
      setCopiedFormat(format)
      toast({
        title: "Copied to Clipboard! ✨",
        description: `${formats.find((f) => f.value === format)?.label} format has been copied successfully`,
      })
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = (format: string) => {
    const output = generateOutput(format, tableData)
    const formatInfo = formats.find((f) => f.value === format)
    if (!formatInfo) return

    const blob = new Blob([output], { type: formatInfo.mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `table_data.${formatInfo.extension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "File Downloaded! 🎉",
      description: `${formatInfo.label} file has been downloaded successfully`,
    })
  }

  const handleTableExpand = () => {
    setIsTableExpanded(!isTableExpanded)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-32 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative z-10 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header - Hide when expanded */}
            {!isTableExpanded && (
              <>
                <Header />
                <StepBar currentStep={currentStep} />
              </>
            )}

            {/* Main Layout */}
            <div className={isTableExpanded ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12"}>
              {/* Left Panel - Input/Preview */}
              <Card
                className={`card-enhanced hover-lift animate-slide-up ${isTableExpanded ? "h-[calc(100vh-2rem)]" : ""}`}
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100 pb-6">
                  <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    Data Input & Templates
                    {isTableExpanded && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTableExpand}
                        className="ml-auto bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Close Fullscreen
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={`p-8 ${isTableExpanded ? "h-[calc(100%-6rem)] overflow-hidden" : ""} custom-scrollbar`}
                >
                  <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-gray-100 to-gray-50 p-1.5 rounded-2xl shadow-inner mb-8">
                      <TabsTrigger
                        value="input"
                        className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 font-bold text-base py-3"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Input Data
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        disabled={!inputData}
                        className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 disabled:opacity-50 font-bold text-base py-3"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Preview & Edit
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="input" className="space-y-8 mt-0">
                      <InputPanel
                        selectedFormat={selectedFormat}
                        setSelectedFormat={setSelectedFormat}
                        inputData={inputData}
                        onInputChange={handleInputChange}
                        onSampleData={handleSampleData}
                        onClear={handleClear}
                        onFileUpload={handleFileUpload}
                        onLoadTable={handleLoadTable}
                        onUseTemplate={handleUseTemplate}
                        tableData={tableData}
                      />
                    </TabsContent>

                    <TabsContent
                      value="preview"
                      className={`space-y-8 mt-0 ${isTableExpanded ? "h-[calc(100%-5rem)]" : ""}`}
                    >
                      <PreviewPanel
                        tableData={tableData}
                        setTableData={setTableData}
                        updateInputData={updateInputData}
                        saveToHistory={saveToHistory}
                        handleUndo={() => {
                          const prevState = handleUndo()
                          if (prevState) {
                            setTableData(prevState.tableData)
                            setInputData(prevState.inputData)
                            clearSelection()
                          }
                        }}
                        handleRedo={() => {
                          const nextState = handleRedo()
                          if (nextState) {
                            setTableData(nextState.tableData)
                            setInputData(nextState.inputData)
                            clearSelection()
                          }
                        }}
                        historyIndex={historyIndex}
                        historyLength={history.length}
                        isTableExpanded={isTableExpanded}
                        onTableExpand={handleTableExpand}
                        inputData={inputData}
                        selectedFormat={selectedFormat}
                        parseInputData={parseInputData}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Right Panel - Output - Hide when expanded */}
              {!isTableExpanded && (
                <Card className="card-enhanced hover-lift animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <CardHeader className="bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 border-b border-gray-100 pb-6">
                    <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-800">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      Export & Share
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 custom-scrollbar">
                    <OutputPanel
                      tableData={tableData}
                      outputFormat={outputFormat}
                      setOutputFormat={setOutputFormat}
                      generateOutput={generateOutput}
                      handleCopy={handleCopy}
                      handleDownload={handleDownload}
                      copiedFormat={copiedFormat}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* How to Use - Hide when expanded */}
            {!isTableExpanded && <HowToUse />}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
