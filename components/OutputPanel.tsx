"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Check, FileText, Share2, Code } from "lucide-react"
import { formats } from "@/lib/constants/formats"
import { SharePanel } from "./SharePanel"

interface OutputPanelProps {
  tableData: string[][]
  outputFormat: string
  setOutputFormat: (format: string) => void
  generateOutput: (format: string, data: string[][]) => string
  handleCopy: (format: string) => void
  handleDownload: (format: string) => void
  copiedFormat: string | null
}

export const OutputPanel = ({
  tableData,
  outputFormat,
  setOutputFormat,
  generateOutput,
  handleCopy,
  handleDownload,
  copiedFormat,
}: OutputPanelProps) => {
  const [activeTab, setActiveTab] = useState("output")
  const output = tableData.length > 0 ? generateOutput(outputFormat, tableData) : ""

  const formatInfo = formats.find((f) => f.value === outputFormat)

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="output"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
          >
            <Code className="w-4 h-4 mr-2" />
            Generated Output
          </TabsTrigger>
          <TabsTrigger
            value="share"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share & Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="output" className="space-y-6 mt-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Output Format
            </label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-purple-300 transition-colors duration-200">
                <SelectValue placeholder="Select output format" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-xl">
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value} className="hover:bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {format.extension.toUpperCase()}
                      </Badge>
                      {format.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => handleCopy(outputFormat)}
              disabled={!output}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {copiedFormat === outputFormat ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>

            <Button
              onClick={() => handleDownload(outputFormat)}
              disabled={!output}
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Output Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">{formatInfo?.label} Output</label>
              {output && (
                <Badge variant="secondary" className="text-xs">
                  {output.length} characters
                </Badge>
              )}
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder={output ? "" : "No data to display. Please input some data first."}
              className="min-h-[300px] bg-gray-50 border-gray-200 font-mono text-sm resize-none"
            />
          </div>

          {/* Format Info */}
          {formatInfo && output && (
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-purple-700">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Output format: {formatInfo.label}</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-0">.{formatInfo.extension}</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="share" className="mt-6">
          <SharePanel tableData={tableData} outputFormat={outputFormat} generateOutput={generateOutput} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
