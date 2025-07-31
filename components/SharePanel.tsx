"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Share2, Link, QrCode, Mail, MessageSquare, Copy, Check, Download, Code, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { copyToClipboard, generateId } from "@/lib/utils"

interface SharePanelProps {
  tableData: string[][]
  outputFormat: string
  generateOutput: (format: string, data: string[][]) => string
}

export const SharePanel = ({ tableData, outputFormat, generateOutput }: SharePanelProps) => {
  const [shareLink, setShareLink] = useState("")
  const [embedCode, setEmbedCode] = useState("")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const { toast } = useToast()

  const generateShareLink = () => {
    if (tableData.length === 0) {
      toast({
        title: "No Data",
        description: "No table data to share",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would upload to a server and return a real URL
    const shareId = generateId()
    const mockUrl = `https://easytableconverter.com/shared/${shareId}`
    setShareLink(mockUrl)

    toast({
      title: "Share Link Generated",
      description: "Your shareable link has been created",
    })
  }

  const generateEmbedCode = () => {
    if (tableData.length === 0) {
      toast({
        title: "No Data",
        description: "No table data to embed",
        variant: "destructive",
      })
      return
    }

    const shareId = generateId()
    const embed = `<iframe src="https://easytableconverter.com/embed/${shareId}" width="100%" height="400" frameborder="0"></iframe>`
    setEmbedCode(embed)

    toast({
      title: "Embed Code Generated",
      description: "Your embed code has been created",
    })
  }

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedItem(type)
      setTimeout(() => setCopiedItem(null), 2000)
      toast({
        title: "Copied!",
        description: `${type} has been copied to clipboard`,
      })
    } else {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  const shareViaEmail = () => {
    const subject = "Shared Table Data"
    const body = `Check out this table data:\n\n${generateOutput(outputFormat, tableData)}`
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
  }

  const shareViaWhatsApp = () => {
    const text = `Check out this table data:\n\n${generateOutput(outputFormat, tableData)}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, "_blank")
  }

  const downloadQRCode = () => {
    if (!shareLink) {
      toast({
        title: "No Link",
        description: "Please generate a share link first",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would generate an actual QR code
    toast({
      title: "QR Code",
      description: "QR code generation would be implemented here",
    })
  }

  return (
    <div className="space-y-6">
      {/* Share Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Share Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={generateShareLink}
              disabled={tableData.length === 0}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Generate Link
            </Button>
            {shareLink && (
              <Button
                onClick={() => handleCopy(shareLink, "Share link")}
                variant="outline"
                className="hover:bg-blue-50"
              >
                {copiedItem === "Share link" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            )}
          </div>
          {shareLink && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <Input value={shareLink} readOnly className="bg-white border-gray-200" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Embed Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Embed Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={generateEmbedCode}
              disabled={tableData.length === 0}
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
            >
              <Globe className="w-4 h-4 mr-2" />
              Generate Embed
            </Button>
            {embedCode && (
              <Button
                onClick={() => handleCopy(embedCode, "Embed code")}
                variant="outline"
                className="hover:bg-green-50"
              >
                {copiedItem === "Embed code" ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            )}
          </div>
          {embedCode && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <Textarea value={embedCode} readOnly className="bg-white border-gray-200 font-mono text-sm" rows={3} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Social Sharing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={shareViaEmail}
              disabled={tableData.length === 0}
              variant="outline"
              className="hover:bg-blue-50 hover:border-blue-300 bg-transparent"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              onClick={shareViaWhatsApp}
              disabled={tableData.length === 0}
              variant="outline"
              className="hover:bg-green-50 hover:border-green-300 bg-transparent"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={downloadQRCode}
              disabled={!shareLink}
              variant="outline"
              className="hover:bg-purple-50 hover:border-purple-300 bg-transparent"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Quick Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["csv", "json", "html", "markdown", "xml", "yaml"].map((format) => (
              <Button
                key={format}
                onClick={() => {
                  const output = generateOutput(format, tableData)
                  handleCopy(output, `${format.toUpperCase()} data`)
                }}
                disabled={tableData.length === 0}
                variant="outline"
                size="sm"
                className="hover:bg-gray-50"
              >
                <Badge variant="secondary" className="mr-2 text-xs">
                  {format.toUpperCase()}
                </Badge>
                Copy
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {tableData.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{tableData.length - 1}</Badge>
                <span className="text-gray-600">Rows</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{tableData[0]?.length || 0}</Badge>
                <span className="text-gray-600">Columns</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{generateOutput(outputFormat, tableData).length}</Badge>
                <span className="text-gray-600">Characters</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
