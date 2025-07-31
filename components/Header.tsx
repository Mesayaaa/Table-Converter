"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Star, Sparkles, TrendingUp, Users, Award } from "lucide-react"

export const Header = () => {
  return (
    <header className="text-center mb-16 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-32 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-float opacity-80"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-16 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-50"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main Header */}
      <div className="space-y-8 animate-slide-up">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110">
              <Zap className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Easy Table
            </h1>
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
              Converter
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg animate-pulse">
                v2.0 - 2025 Edition
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1 text-xs font-bold">
                NEW
              </Badge>
            </div>
          </div>
        </div>

        {/* Subtitle with Animation */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-2xl md:text-4xl text-gray-700 font-bold max-w-4xl mx-auto leading-relaxed">
            Transform Your Data with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional Precision
            </span>
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Convert between 11+ formats instantly • Advanced table editing • Professional templates • Share anywhere
          </p>
        </div>

        {/* Enhanced Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-6 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-default">
            <Sparkles className="w-5 h-5 mr-2" />
            11+ Formats
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-default">
            <TrendingUp className="w-5 h-5 mr-2" />
            Real-time Preview
          </Badge>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-default">
            <Users className="w-5 h-5 mr-2" />
            Collaborative
          </Badge>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-6 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-default">
            <Award className="w-5 h-5 mr-2" />
            Professional
          </Badge>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-10 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 btn-gradient"
            onClick={() => document.getElementById("input-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Zap className="w-6 h-6 mr-3" />
            Start Converting Now
          </Button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              11+
            </div>
            <div className="text-sm md:text-base text-gray-600 font-semibold">Formats</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              100%
            </div>
            <div className="text-sm md:text-base text-gray-600 font-semibold">Free</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              ∞
            </div>
            <div className="text-sm md:text-base text-gray-600 font-semibold">Unlimited</div>
          </div>
        </div>
      </div>
    </header>
  )
}
