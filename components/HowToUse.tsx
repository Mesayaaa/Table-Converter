"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Eye,
  Download,
  Sparkles,
  Target,
  Zap,
  RotateCcw,
  Save,
  Share2,
  Smartphone,
  ArrowRight,
} from "lucide-react"

export const HowToUse = () => {
  const steps = [
    {
      icon: Upload,
      title: "1. Input Your Data",
      description:
        "Choose from 11+ input formats including CSV, JSON, HTML, XML, and more. Paste your data, upload a file, or start with our professional templates.",
      color: "from-blue-500 to-cyan-500",
      features: ["Drag & Drop", "File Upload", "Templates", "Sample Data"],
    },
    {
      icon: Eye,
      title: "2. Edit & Preview",
      description:
        "Use our advanced table editor to modify data, add/remove rows and columns, sort, filter, and organize your information exactly how you need it.",
      color: "from-purple-500 to-pink-500",
      features: ["Real-time Editing", "Sort & Filter", "Drag & Drop", "Undo/Redo"],
    },
    {
      icon: Download,
      title: "3. Export & Share",
      description:
        "Convert to any of 11+ output formats. Copy to clipboard, download files, or share with colleagues using our built-in sharing features.",
      color: "from-green-500 to-emerald-500",
      features: ["Multiple Formats", "One-Click Copy", "Share Links", "Embed Code"],
    },
  ]

  const features = [
    { icon: Sparkles, text: "Support for 11+ data formats", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Target, text: "Real-time preview and editing", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: Zap, text: "Drag & drop row/column reordering", color: "text-green-500", bg: "bg-green-50" },
    { icon: RotateCcw, text: "Unlimited undo/redo functionality", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Save, text: "Save and load table templates", color: "text-red-500", bg: "bg-red-50" },
    { icon: Share2, text: "Professional templates included", color: "text-indigo-500", bg: "bg-indigo-50" },
    { icon: Smartphone, text: "Responsive design for all devices", color: "text-pink-500", bg: "bg-pink-50" },
  ]

  const formats = ["CSV", "TSV", "JSON", "HTML", "Markdown", "XML", "YAML", "SQL", "LaTeX", "ASCII", "Excel"]

  return (
    <div className="mt-20 space-y-16">
      {/* How to Use Section */}
      <Card className="card-enhanced animate-slide-up overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100 pb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-black text-gray-800">How It Works</CardTitle>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your data in 3 simple steps with our powerful converter
          </p>
        </CardHeader>
        <CardContent className="p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="text-center group relative">
                  {/* Step Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0">
                      <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative mb-8">
                      <div
                        className={`w-24 h-24 mx-auto bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110`}
                      >
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                      ></div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">{step.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {step.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          className={`bg-gradient-to-r ${step.color} text-white border-0 px-3 py-1 text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Features Section */}
      <Card className="card-enhanced animate-slide-up overflow-hidden" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="text-center bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-b border-gray-100 pb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-black text-gray-800">Powerful Features</CardTitle>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for professional table conversion and management
          </p>
        </CardHeader>
        <CardContent className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-gray-700 font-semibold text-lg group-hover:text-gray-900 transition-colors">
                    {feature.text}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card className="card-enhanced animate-slide-up overflow-hidden" style={{ animationDelay: "0.4s" }}>
        <CardHeader className="text-center bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 border-b border-gray-100 pb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-black text-gray-800">Supported Formats</CardTitle>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert between all popular data formats with perfect accuracy
          </p>
        </CardHeader>
        <CardContent className="p-12">
          <div className="flex flex-wrap justify-center gap-4">
            {formats.map((format, index) => (
              <Badge
                key={format}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-0 px-6 py-3 text-base font-bold hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all duration-300 cursor-default hover:scale-105 shadow-md hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {format}
              </Badge>
            ))}
          </div>

          {/* Format Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                11+
              </div>
              <div className="text-lg font-semibold text-gray-600">Supported Formats</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                ∞
              </div>
              <div className="text-lg font-semibold text-gray-600">Unlimited Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-lg font-semibold text-gray-600">Free to Use</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-3xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
          <span className="font-bold text-xl text-gray-800">
            Ready to transform your data? Start converting now! 🚀
          </span>
        </div>
      </div>
    </div>
  )
}
