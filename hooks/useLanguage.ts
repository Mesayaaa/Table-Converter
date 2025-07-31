"use client"

import { useState, useCallback } from "react"
import { translations } from "@/lib/i18n/translations"

type Language = "en" | "id"

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let value: any = translations[currentLanguage]

      for (const k of keys) {
        value = value?.[k]
      }

      return value || key
    },
    [currentLanguage],
  )

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage((prev) => (prev === "en" ? "id" : "en"))
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
  }, [])

  return {
    currentLanguage,
    t,
    toggleLanguage,
    setLanguage,
  }
}
