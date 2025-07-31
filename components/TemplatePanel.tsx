"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, TrendingUp, Calendar, Star, Building, CreditCard, Package, UserCheck } from "lucide-react"

interface TemplatePanelProps {
  onUseTemplate: (data: string[][]) => void
}

const templates = [
  {
    id: "employees",
    name: "Employee Directory",
    description: "Basic employee information template",
    icon: <Users className="w-5 h-5" />,
    category: "HR",
    popular: true,
    data: [
      ["Name", "Position", "Department", "Email", "Phone"],
      ["John Smith", "Software Engineer", "Engineering", "john@company.com", "+1-555-0101"],
      ["Sarah Johnson", "Product Manager", "Product", "sarah@company.com", "+1-555-0102"],
      ["Mike Davis", "Designer", "Design", "mike@company.com", "+1-555-0103"],
      ["Lisa Wilson", "HR Manager", "Human Resources", "lisa@company.com", "+1-555-0104"],
    ],
  },
  {
    id: "sales",
    name: "Sales Report",
    description: "Monthly sales performance data",
    icon: <TrendingUp className="w-5 h-5" />,
    category: "Sales",
    popular: true,
    data: [
      ["Product", "Units Sold", "Revenue", "Month", "Region"],
      ["Laptop Pro", "150", "$225,000", "January", "North"],
      ["Tablet Max", "200", "$120,000", "January", "South"],
      ["Phone Ultra", "300", "$180,000", "January", "East"],
      ["Watch Smart", "100", "$25,000", "January", "West"],
    ],
  },
  {
    id: "inventory",
    name: "Product Inventory",
    description: "Stock management template",
    icon: <Package className="w-5 h-5" />,
    category: "Inventory",
    popular: false,
    data: [
      ["SKU", "Product Name", "Category", "Stock", "Price", "Supplier"],
      ["LP001", 'Laptop Pro 15"', "Electronics", "45", "$1,499", "TechCorp"],
      ["TB002", 'Tablet Max 10"', "Electronics", "78", "$599", "TechCorp"],
      ["PH003", "Phone Ultra 5G", "Electronics", "120", "$899", "MobileTech"],
      ["WS004", "Smart Watch", "Wearables", "200", "$249", "WearTech"],
    ],
  },
  {
    id: "customers",
    name: "Customer Database",
    description: "Customer contact information",
    icon: <UserCheck className="w-5 h-5" />,
    category: "CRM",
    popular: false,
    data: [
      ["Customer ID", "Name", "Email", "Phone", "City", "Status"],
      ["C001", "Alice Brown", "alice@email.com", "+1-555-1001", "New York", "Active"],
      ["C002", "Bob Wilson", "bob@email.com", "+1-555-1002", "Los Angeles", "Active"],
      ["C003", "Carol Davis", "carol@email.com", "+1-555-1003", "Chicago", "Inactive"],
      ["C004", "David Miller", "david@email.com", "+1-555-1004", "Houston", "Active"],
    ],
  },
  {
    id: "events",
    name: "Event Schedule",
    description: "Event planning and scheduling",
    icon: <Calendar className="w-5 h-5" />,
    category: "Events",
    popular: false,
    data: [
      ["Event", "Date", "Time", "Location", "Attendees", "Status"],
      ["Team Meeting", "2024-02-15", "10:00 AM", "Conference Room A", "12", "Confirmed"],
      ["Product Launch", "2024-02-20", "2:00 PM", "Main Auditorium", "150", "Confirmed"],
      ["Training Session", "2024-02-25", "9:00 AM", "Training Room", "25", "Pending"],
      ["Client Presentation", "2024-03-01", "3:00 PM", "Client Office", "8", "Confirmed"],
    ],
  },
  {
    id: "financial",
    name: "Financial Report",
    description: "Monthly financial overview",
    icon: <CreditCard className="w-5 h-5" />,
    category: "Finance",
    popular: true,
    data: [
      ["Category", "Budget", "Actual", "Variance", "Percentage"],
      ["Revenue", "$100,000", "$105,000", "$5,000", "105%"],
      ["Marketing", "$15,000", "$14,200", "$800", "94.7%"],
      ["Operations", "$25,000", "$26,500", "-$1,500", "106%"],
      ["Salaries", "$45,000", "$45,000", "$0", "100%"],
    ],
  },
]

export const TemplatePanel = ({ onUseTemplate }: TemplatePanelProps) => {
  const popularTemplates = templates.filter((t) => t.popular)
  const allTemplates = templates

  return (
    <div className="space-y-6">
      {/* Popular Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Popular Templates</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {popularTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">{template.icon}</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base font-semibold truncate">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {template.data[0].slice(0, 3).map((header, index) => (
                            <TableHead key={index} className="text-xs font-medium py-2 px-3">
                              {header}
                            </TableHead>
                          ))}
                          {template.data[0].length > 3 && (
                            <TableHead className="text-xs font-medium py-2 px-3">...</TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {template.data.slice(1, 3).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.slice(0, 3).map((cell, cellIndex) => (
                              <TableCell key={cellIndex} className="text-xs py-2 px-3 truncate max-w-[100px]">
                                {cell}
                              </TableCell>
                            ))}
                            {row.length > 3 && (
                              <TableCell className="text-xs py-2 px-3 text-muted-foreground">...</TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Button onClick={() => onUseTemplate(template.data)} className="w-full sm:w-auto" size="sm">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Templates */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">All Templates</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {allTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">{template.icon}</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base font-semibold truncate">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    {template.popular && (
                      <Badge variant="default" className="text-xs">
                        Popular
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {template.data[0].slice(0, 3).map((header, index) => (
                            <TableHead key={index} className="text-xs font-medium py-2 px-3">
                              {header}
                            </TableHead>
                          ))}
                          {template.data[0].length > 3 && (
                            <TableHead className="text-xs font-medium py-2 px-3">...</TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {template.data.slice(1, 3).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.slice(0, 3).map((cell, cellIndex) => (
                              <TableCell key={cellIndex} className="text-xs py-2 px-3 truncate max-w-[100px]">
                                {cell}
                              </TableCell>
                            ))}
                            {row.length > 3 && (
                              <TableCell className="text-xs py-2 px-3 text-muted-foreground">...</TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Button onClick={() => onUseTemplate(template.data)} className="w-full sm:w-auto" size="sm">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
