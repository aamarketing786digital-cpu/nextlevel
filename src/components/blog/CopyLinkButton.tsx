"use client"

import { useState } from "react"
import { Link2, Check } from "lucide-react"

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyLink}
      className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-medium transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          Copy Link
        </>
      )}
    </button>
  )
}
