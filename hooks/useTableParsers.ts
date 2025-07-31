"use client"

import { useCallback } from "react"

export const useTableParsers = () => {
  const parseInputData = useCallback((data: string, format: string): string[][] => {
    if (!data.trim()) return []

    try {
      switch (format) {
        case "csv":
          return parseCSV(data)
        case "tsv":
          return parseTSV(data)
        case "json":
          return parseJSON(data)
        case "html":
          return parseHTML(data)
        case "markdown":
          return parseMarkdown(data)
        case "xml":
          return parseXML(data)
        case "yaml":
          return parseYAML(data)
        case "sql":
          return parseSQL(data)
        case "latex":
          return parseLaTeX(data)
        case "ascii":
          return parseASCII(data)
        case "excel":
          return parseExcel(data)
        default:
          return parseCSV(data)
      }
    } catch (error) {
      console.error(`Error parsing ${format}:`, error)
      return []
    }
  }, [])

  return { parseInputData }
}

const parseCSV = (data: string): string[][] => {
  const lines = data.trim().split("\n")
  const result: string[][] = []

  for (const line of lines) {
    const row: string[] = []
    let current = ""
    let inQuotes = false
    let i = 0

    while (i < line.length) {
      const char = line[i]
      const nextChar = line[i + 1]

      if (char === '"' && !inQuotes) {
        inQuotes = true
      } else if (char === '"' && inQuotes) {
        if (nextChar === '"') {
          current += '"'
          i++ // Skip next quote
        } else {
          inQuotes = false
        }
      } else if (char === "," && !inQuotes) {
        row.push(current.trim())
        current = ""
      } else {
        current += char
      }
      i++
    }

    row.push(current.trim())
    result.push(row)
  }

  return result
}

const parseTSV = (data: string): string[][] => {
  return data
    .trim()
    .split("\n")
    .map((line) => line.split("\t"))
}

const parseJSON = (data: string): string[][] => {
  const jsonData = JSON.parse(data)
  if (!Array.isArray(jsonData) || jsonData.length === 0) return []

  const headers = Object.keys(jsonData[0])
  const result = [headers]

  jsonData.forEach((item) => {
    const row = headers.map((header) => String(item[header] || ""))
    result.push(row)
  })

  return result
}

const parseHTML = (data: string): string[][] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, "text/html")
  const table = doc.querySelector("table")

  if (!table) return []

  const result: string[][] = []
  const rows = table.querySelectorAll("tr")

  rows.forEach((row) => {
    const cells = row.querySelectorAll("th, td")
    const rowData = Array.from(cells).map((cell) => cell.textContent?.trim() || "")
    if (rowData.length > 0) {
      result.push(rowData)
    }
  })

  return result
}

const parseMarkdown = (data: string): string[][] => {
  const lines = data.trim().split("\n")
  const result: string[][] = []

  for (const line of lines) {
    if (line.includes("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell, index, arr) => {
          // Remove empty cells at start and end
          return !(index === 0 && cell === "") && !(index === arr.length - 1 && cell === "")
        })

      // Skip separator lines (containing only dashes and pipes)
      if (!cells.every((cell) => /^-+$/.test(cell))) {
        result.push(cells)
      }
    }
  }

  return result
}

const parseXML = (data: string): string[][] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, "text/xml")
  const rows = doc.querySelectorAll("row")

  if (rows.length === 0) return []

  // Get headers from first row
  const firstRow = rows[0]
  const headers = Array.from(firstRow.children).map((child) => child.tagName)
  const result = [headers]

  // Get data from all rows
  rows.forEach((row) => {
    const rowData = headers.map((header) => {
      const element = row.querySelector(header)
      return element?.textContent?.trim() || ""
    })
    result.push(rowData)
  })

  return result
}

const parseYAML = (data: string): string[][] => {
  // Simple YAML parser for array of objects
  const lines = data.trim().split("\n")
  const items: Record<string, string>[] = []
  let currentItem: Record<string, string> = {}

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("- ")) {
      if (Object.keys(currentItem).length > 0) {
        items.push(currentItem)
      }
      currentItem = {}
      const keyValue = trimmed.substring(2).split(":")
      if (keyValue.length === 2) {
        currentItem[keyValue[0].trim()] = keyValue[1].trim()
      }
    } else if (trimmed.includes(":")) {
      const keyValue = trimmed.split(":")
      if (keyValue.length === 2) {
        currentItem[keyValue[0].trim()] = keyValue[1].trim()
      }
    }
  }

  if (Object.keys(currentItem).length > 0) {
    items.push(currentItem)
  }

  if (items.length === 0) return []

  const headers = Object.keys(items[0])
  const result = [headers]

  items.forEach((item) => {
    const row = headers.map((header) => item[header] || "")
    result.push(row)
  })

  return result
}

const parseSQL = (data: string): string[][] => {
  // Extract table name and columns from INSERT statement
  const insertMatch = data.match(/INSERT\s+INTO\s+(\w+)\s*$$([^)]+)$$\s+VALUES/i)
  if (!insertMatch) return []

  const columns = insertMatch[2].split(",").map((col) => col.trim())
  const result = [columns]

  // Extract values
  const valuesMatch = data.match(/VALUES\s*(.*);?/is)
  if (!valuesMatch) return result

  const valuesString = valuesMatch[1]
  const valueRows = valuesString.split(/\),\s*\(/)

  valueRows.forEach((row) => {
    const cleanRow = row.replace(/^$$|$$$/g, "")
    const values = cleanRow.split(",").map((val) => {
      return val.trim().replace(/^'|'$/g, "")
    })
    result.push(values)
  })

  return result
}

const parseLaTeX = (data: string): string[][] => {
  const lines = data.split("\n")
  const result: string[][] = []

  for (const line of lines) {
    if (line.includes("&") && line.includes("\\\\")) {
      const cells = line
        .replace(/\\\\/g, "")
        .split("&")
        .map((cell) => cell.trim())
      result.push(cells)
    }
  }

  return result
}

const parseASCII = (data: string): string[][] => {
  const lines = data.split("\n")
  const result: string[][] = []

  for (const line of lines) {
    if (line.includes("|") && !line.match(/^[+\-|]+$/)) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell, index, arr) => {
          return !(index === 0 && cell === "") && !(index === arr.length - 1 && cell === "")
        })
      if (cells.length > 0) {
        result.push(cells)
      }
    }
  }

  return result
}

const parseExcel = (data: string): string[][] => {
  const lines = data.split("\n")
  const result: string[][] = []

  for (const line of lines) {
    if (line.includes("CONCATENATE")) {
      const match = line.match(/CONCATENATE$$([^)]+)$$/)
      if (match) {
        const values = match[1].split(",").map((val) => {
          return val.trim().replace(/^"|"$/g, "")
        })
        result.push(values)
      }
    }
  }

  return result
}
