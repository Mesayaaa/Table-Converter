export const generateOutput = (format: string, data: string[][]): string => {
  if (!data || data.length === 0) return ""

  switch (format) {
    case "csv":
      return generateCSV(data)
    case "tsv":
      return generateTSV(data)
    case "json":
      return generateJSON(data)
    case "html":
      return generateHTML(data)
    case "markdown":
      return generateMarkdown(data)
    case "xml":
      return generateXML(data)
    case "yaml":
      return generateYAML(data)
    case "sql":
      return generateSQL(data)
    case "latex":
      return generateLaTeX(data)
    case "ascii":
      return generateASCII(data)
    case "excel":
      return generateExcel(data)
    default:
      return generateCSV(data)
  }
}

const escapeCSV = (value: string): string => {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

const generateCSV = (data: string[][]): string => {
  return data.map((row) => row.map(escapeCSV).join(",")).join("\n")
}

const generateTSV = (data: string[][]): string => {
  return data.map((row) => row.join("\t")).join("\n")
}

const generateJSON = (data: string[][]): string => {
  if (data.length === 0) return "[]"

  const headers = data[0]
  const rows = data.slice(1)

  const jsonData = rows.map((row) => {
    const obj: Record<string, any> = {}
    headers.forEach((header, index) => {
      const value = row[index] || ""
      // Try to parse as number if it looks like one
      const numValue = Number.parseFloat(value)
      obj[header] = !isNaN(numValue) && value !== "" ? numValue : value
    })
    return obj
  })

  return JSON.stringify(jsonData, null, 2)
}

const generateHTML = (data: string[][]): string => {
  if (data.length === 0) return "<table></table>"

  const headers = data[0]
  const rows = data.slice(1)

  let html = '<table class="table">\n'

  // Generate header
  if (headers.length > 0) {
    html += "  <thead>\n    <tr>\n"
    headers.forEach((header) => {
      html += `      <th>${escapeHTML(header)}</th>\n`
    })
    html += "    </tr>\n  </thead>\n"
  }

  // Generate body
  if (rows.length > 0) {
    html += "  <tbody>\n"
    rows.forEach((row) => {
      html += "    <tr>\n"
      row.forEach((cell) => {
        html += `      <td>${escapeHTML(cell || "")}</td>\n`
      })
      html += "    </tr>\n"
    })
    html += "  </tbody>\n"
  }

  html += "</table>"
  return html
}

const escapeHTML = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const generateMarkdown = (data: string[][]): string => {
  if (data.length === 0) return ""

  const headers = data[0]
  const rows = data.slice(1)

  let markdown = "| " + headers.join(" | ") + " |\n"
  markdown += "|" + headers.map(() => "---").join("|") + "|\n"

  rows.forEach((row) => {
    markdown += "| " + row.map((cell) => (cell || "").replace(/\|/g, "\\|")).join(" | ") + " |\n"
  })

  return markdown
}

const generateXML = (data: string[][]): string => {
  if (data.length === 0) return '<?xml version="1.0" encoding="UTF-8"?>\n<table></table>'

  const headers = data[0]
  const rows = data.slice(1)

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<table>\n'

  rows.forEach((row) => {
    xml += "  <row>\n"
    headers.forEach((header, index) => {
      const value = row[index] || ""
      xml += `    <${escapeXMLTag(header)}>${escapeXML(value)}</${escapeXMLTag(header)}>\n`
    })
    xml += "  </row>\n"
  })

  xml += "</table>"
  return xml
}

const escapeXML = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

const escapeXMLTag = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9_-]/g, "_")
}

const generateYAML = (data: string[][]): string => {
  if (data.length === 0) return "[]"

  const headers = data[0]
  const rows = data.slice(1)

  let yaml = ""
  rows.forEach((row, index) => {
    yaml += `- `
    headers.forEach((header, headerIndex) => {
      const value = row[headerIndex] || ""
      if (headerIndex === 0) {
        yaml += `${header}: ${escapeYAML(value)}\n`
      } else {
        yaml += `  ${header}: ${escapeYAML(value)}\n`
      }
    })
  })

  return yaml
}

const escapeYAML = (text: string): string => {
  if (text.includes(":") || text.includes("-") || text.includes("[") || text.includes("]")) {
    return `"${text.replace(/"/g, '\\"')}"`
  }
  return text
}

const generateSQL = (data: string[][]): string => {
  if (data.length === 0) return ""

  const headers = data[0]
  const rows = data.slice(1)
  const tableName = "table_data"

  let sql = `INSERT INTO ${tableName} (${headers.join(", ")}) VALUES\n`

  const values = rows.map((row) => {
    const escapedValues = row.map((cell) => {
      const value = cell || ""
      // Check if it's a number
      const numValue = Number.parseFloat(value)
      if (!isNaN(numValue) && value !== "") {
        return numValue.toString()
      }
      // Escape string values
      return `'${value.replace(/'/g, "''")}'`
    })
    return `(${escapedValues.join(", ")})`
  })

  sql += values.join(",\n") + ";"
  return sql
}

const generateLaTeX = (data: string[][]): string => {
  if (data.length === 0) return ""

  const headers = data[0]
  const rows = data.slice(1)
  const columnSpec = headers.map(() => "l").join("|")

  let latex = `\\begin{tabular}{|${columnSpec}|}\n\\hline\n`
  latex += headers.map(escapeLaTeX).join(" & ") + " \\\\\n\\hline\n"

  rows.forEach((row) => {
    latex += row.map((cell) => escapeLaTeX(cell || "")).join(" & ") + " \\\\\n"
  })

  latex += "\\hline\n\\end{tabular}"
  return latex
}

const escapeLaTeX = (text: string): string => {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\$/g, "\\$")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/#/g, "\\#")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/_/g, "\\_")
    .replace(/~/g, "\\textasciitilde{}")
}

const generateASCII = (data: string[][]): string => {
  if (data.length === 0) return ""

  // Calculate column widths
  const colWidths: number[] = []
  data.forEach((row) => {
    row.forEach((cell, index) => {
      const cellLength = (cell || "").length
      colWidths[index] = Math.max(colWidths[index] || 0, cellLength)
    })
  })

  // Generate separator line
  const separator = "+" + colWidths.map((width) => "-".repeat(width + 2)).join("+") + "+"

  let ascii = separator + "\n"

  data.forEach((row, rowIndex) => {
    ascii += "|"
    row.forEach((cell, cellIndex) => {
      const paddedCell = (cell || "").padEnd(colWidths[cellIndex])
      ascii += ` ${paddedCell} |`
    })
    ascii += "\n"

    if (rowIndex === 0) {
      ascii += separator + "\n"
    }
  })

  ascii += separator
  return ascii
}

const generateExcel = (data: string[][]): string => {
  if (data.length === 0) return ""

  let excel = ""
  data.forEach((row, rowIndex) => {
    const excelRow = row.map((cell) => `"${(cell || "").replace(/"/g, '""')}"`).join(", CHAR(9), ")
    excel += `=CONCATENATE(${excelRow})\n`
  })

  return excel
}
