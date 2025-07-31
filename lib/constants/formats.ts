import type { FormatInfo } from "@/lib/types"

export const formats: FormatInfo[] = [
  {
    value: "csv",
    label: "CSV",
    extension: "csv",
    mimeType: "text/csv",
  },
  {
    value: "tsv",
    label: "TSV",
    extension: "tsv",
    mimeType: "text/tab-separated-values",
  },
  {
    value: "json",
    label: "JSON",
    extension: "json",
    mimeType: "application/json",
  },
  {
    value: "html",
    label: "HTML Table",
    extension: "html",
    mimeType: "text/html",
  },
  {
    value: "markdown",
    label: "Markdown",
    extension: "md",
    mimeType: "text/markdown",
  },
  {
    value: "xml",
    label: "XML",
    extension: "xml",
    mimeType: "application/xml",
  },
  {
    value: "yaml",
    label: "YAML",
    extension: "yaml",
    mimeType: "application/x-yaml",
  },
  {
    value: "sql",
    label: "SQL Insert",
    extension: "sql",
    mimeType: "application/sql",
  },
  {
    value: "latex",
    label: "LaTeX",
    extension: "tex",
    mimeType: "application/x-latex",
  },
  {
    value: "ascii",
    label: "ASCII Table",
    extension: "txt",
    mimeType: "text/plain",
  },
  {
    value: "excel",
    label: "Excel Formula",
    extension: "txt",
    mimeType: "text/plain",
  },
]
