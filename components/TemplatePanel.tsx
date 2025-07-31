"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, DollarSign, Package, Users, TrendingUp, Calendar, Sparkles, Star, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TemplatePanelProps {
  onUseTemplate: (data: string[][]) => void
}

export const TemplatePanel = ({ onUseTemplate }: TemplatePanelProps) => {
  const { toast } = useToast()

  const templates = [
    {
      id: "business",
      name: "Business Report",
      description: "Quarterly business performance data with revenue, expenses, and growth metrics",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      data: [
        ["Quarter", "Revenue", "Expenses", "Profit", "Growth %"],
        ["Q1 2024", "250000", "180000", "70000", "12.5"],
        ["Q2 2024", "280000", "195000", "85000", "21.4"],
        ["Q3 2024", "320000", "220000", "100000", "17.6"],
        ["Q4 2024", "350000", "240000", "110000", "10.0"],
      ],
    },
    {
      id: "financial",
      name: "Financial Tracker",
      description: "Personal or business financial tracking with income, expenses, and savings",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      popular: false,
      data: [
        ["Month", "Income", "Expenses", "Savings", "Category"],
        ["January", "5000", "3200", "1800", "Personal"],
        ["February", "5200", "3100", "2100", "Personal"],
        ["March", "4800", "3400", "1400", "Personal"],
        ["April", "5500", "3300", "2200", "Personal"],
        ["May", "5300", "3500", "1800", "Personal"],
      ],
    },
    {
      id: "inventory",
      name: "Inventory Management",
      description: "Product inventory with stock levels, pricing, and supplier information",
      icon: Package,
      color: "from-purple-500 to-pink-500",
      popular: true,
      data: [
        ["Product ID", "Product Name", "Category", "Stock", "Price", "Supplier"],
        ["P001", "Laptop Pro 15", "Electronics", "25", "1299.99", "TechCorp"],
        ["P002", "Wireless Mouse", "Electronics", "150", "29.99", "TechCorp"],
        ["P003", "Office Chair", "Furniture", "45", "199.99", "FurniCo"],
        ["P004", "Desk Lamp", "Furniture", "80", "49.99", "FurniCo"],
        ["P005", "Notebook Set", "Stationery", "200", "12.99", "PaperPlus"],
      ],
    },
    {
      id: "employees",
      name: "Employee Directory",
      description: "Staff information with contact details and organizational structure",
      icon: Users,
      color: "from-orange-500 to-red-500",
      popular: false,
      data: [
        ["Employee ID", "Name", "Department", "Position", "Email", "Phone"],
        ["EMP001", "John Smith", "Engineering", "Senior Developer", "john.smith@company.com", "+1-555-0101"],
        ["EMP002", "Sarah Johnson", "Marketing", "Marketing Manager", "sarah.johnson@company.com", "+1-555-0102"],
        ["EMP003", "Mike Davis", "Sales", "Sales Representative", "mike.davis@company.com", "+1-555-0103"],
        ["EMP004", "Emily Brown", "HR", "HR Specialist", "emily.brown@company.com", "+1-555-0104"],
        ["EMP005", "David Wilson", "Finance", "Financial Analyst", "david.wilson@company.com", "+1-555-0105"],
      ],
    },
    {
      id: "sales",
      name: "Sales Performance",
      description: "Sales data with regional performance and quarterly comparisons",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500",
      popular: true,
      data: [
        ["Salesperson", "Region", "Q1 Sales", "Q2 Sales", "Q3 Sales", "Total"],
        ["Alice Cooper", "North", "45000", "52000", "48000", "145000"],
        ["Bob Martinez", "South", "38000", "41000", "44000", "123000"],
        ["Carol White", "East", "51000", "49000", "53000", "153000"],
        ["Dan Lee", "West", "42000", "46000", "50000", "138000"],
        ["Eva Garcia", "Central", "39000", "43000", "47000", "129000"],
      ],
    },
    {
      id: "projects",
      name: "Project Timeline",
      description: "Project management with milestones, deadlines, and team assignments",
      icon: Calendar,
      color: "from-teal-500 to-blue-500",
      popular: false,
      data: [
        ["Project", "Start Date", "End Date", "Status", "Progress %", "Team Lead"],
        ["Website Redesign", "2024-01-15", "2024-03-30", "In Progress", "75", "Alice Johnson"],
        ["Mobile App", "2024-02-01", "2024-05-15", "Planning", "25", "Bob Smith"],
        ["Database Migration", "2024-01-01", "2024-02-28", "Completed", "100", "Carol Davis"],
        ["API Integration", "2024-03-01", "2024-04-30", "In Progress", "60", "David Wilson"],
        ["Security Audit", "2024-04-01", "2024-06-30", "Not Started", "0", "Eva Martinez"],
      ],
    },
  ]

  const handleUseTemplate = (template: (typeof templates)[0]) => {
    onUseTemplate(template.data)
    toast({
      title: "Template Applied! ✨",
      description: `${template.name} template has been loaded successfully`,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center animate-slide-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Professional Templates</h3>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Jump-start your project with our carefully crafted templates designed for real-world use cases
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template, index) => {
          const IconComponent = template.icon
          return (
            <Card
              key={template.id}
              className="card-enhanced hover-lift group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${template.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    {template.popular && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {template.name}
                      </CardTitle>
                      {template.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs font-bold">
                          POPULAR
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{template.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Preview */}
                <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    PREVIEW
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs font-bold text-gray-700">
                      {template.data[0].slice(0, 3).map((header, index) => (
                        <div key={index} className="truncate bg-white px-2 py-1 rounded">
                          {header}
                        </div>
                      ))}
                    </div>
                    {template.data.slice(1, 3).map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        {row.slice(0, 3).map((cell, cellIndex) => (
                          <div key={cellIndex} className="truncate bg-white/50 px-2 py-1 rounded">
                            {cell}
                          </div>
                        ))}
                      </div>
                    ))}
                    {template.data.length > 3 && (
                      <div className="text-xs text-gray-400 text-center py-2 font-medium">
                        ... and {template.data.length - 3} more rows
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs font-bold">
                      {template.data.length - 1} rows
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-bold">
                      {template.data[0]?.length || 0} columns
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className={`bg-gradient-to-r ${template.color} hover:shadow-lg text-white border-0 transition-all duration-300 hover:scale-105 font-semibold`}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border border-blue-200">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-blue-800">
            Need a custom template? Create your own and save it for later!
          </span>
        </div>
      </div>
    </div>
  )
}
