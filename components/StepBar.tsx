"use client"

import { CheckCircle, Circle, ArrowRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepBarProps {
  currentStep: number
}

export const StepBar = ({ currentStep }: StepBarProps) => {
  const steps = [
    {
      number: 1,
      title: "Input Data",
      description: "Paste, upload, or use templates",
      icon: "📝",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: 2,
      title: "Preview & Edit",
      description: "Review and modify your table",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: 3,
      title: "Export Results",
      description: "Convert and download",
      icon: "🚀",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="max-w-5xl mx-auto">
        {/* Progress Header */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Progress</h3>
          <p className="text-gray-600">Follow these simple steps to convert your data</p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center relative z-10 group">
              {/* Step Circle */}
              <div className="relative mb-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-xl",
                    currentStep >= step.number
                      ? `bg-gradient-to-r ${step.color} text-white scale-110 shadow-2xl`
                      : "bg-white text-gray-400 border-2 border-gray-200 hover:border-gray-300",
                  )}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : currentStep === step.number ? (
                    <div className="text-2xl animate-pulse">{step.icon}</div>
                  ) : (
                    <Circle className="w-8 h-8" />
                  )}
                </div>

                {/* Glow effect for active step */}
                {currentStep === step.number && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-30 animate-pulse`}
                  ></div>
                )}

                {/* Step number badge */}
                <div
                  className={cn(
                    "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    currentStep >= step.number ? "bg-white text-gray-800 shadow-lg" : "bg-gray-200 text-gray-500",
                  )}
                >
                  {step.number}
                </div>
              </div>

              {/* Step Content - Centered vertically */}
              <div className="text-center max-w-xs flex flex-col items-center justify-center">
                <h4
                  className={cn(
                    "font-bold text-lg mb-2 transition-all duration-300 flex items-center justify-center",
                    currentStep >= step.number ? "text-gray-900" : "text-gray-500",
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed flex items-center justify-center text-center">
                  {step.description}
                </p>

                {/* Active step indicator */}
                {currentStep === step.number && (
                  <div className="mt-3 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                      <Zap className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">Active</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-full w-full flex items-center justify-center pointer-events-none">
                  <ArrowRight
                    className={cn(
                      "w-6 h-6 transition-all duration-300",
                      currentStep > step.number
                        ? "text-green-500 animate-pulse"
                        : currentStep === step.number
                          ? "text-blue-500"
                          : "text-gray-300",
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {currentStep >= steps.length && (
          <div className="text-center mt-8 animate-scale-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-800">All steps completed! 🎉</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
