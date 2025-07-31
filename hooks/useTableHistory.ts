"use client"

import { useState, useCallback, useRef } from "react"
import type { HistoryState } from "@/lib/types"

export const useTableHistory = () => {
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const isUndoRedoOperation = useRef(false)

  const saveToHistory = useCallback(
    (tableData: string[][], inputData: string) => {
      if (isUndoRedoOperation.current) {
        isUndoRedoOperation.current = false
        return
      }

      const newState: HistoryState = {
        tableData: JSON.parse(JSON.stringify(tableData)),
        inputData,
        timestamp: Date.now(),
      }

      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1)
        newHistory.push(newState)

        // Keep only last 50 states
        if (newHistory.length > 50) {
          newHistory.shift()
          setHistoryIndex(newHistory.length - 1)
          return newHistory
        }

        setHistoryIndex(newHistory.length - 1)
        return newHistory
      })
    },
    [historyIndex],
  )

  const handleUndo = useCallback((): HistoryState | null => {
    if (historyIndex > 0) {
      isUndoRedoOperation.current = true
      setHistoryIndex(historyIndex - 1)
      return history[historyIndex - 1]
    }
    return null
  }, [history, historyIndex])

  const handleRedo = useCallback((): HistoryState | null => {
    if (historyIndex < history.length - 1) {
      isUndoRedoOperation.current = true
      setHistoryIndex(historyIndex + 1)
      return history[historyIndex + 1]
    }
    return null
  }, [history, historyIndex])

  const clearHistory = useCallback(() => {
    setHistory([])
    setHistoryIndex(-1)
  }, [])

  return {
    history,
    historyIndex,
    saveToHistory,
    handleUndo,
    handleRedo,
    clearHistory,
    isUndoRedoOperation: isUndoRedoOperation.current,
  }
}
