'use client'

import { useEffect, useState } from 'react'
import { HungweBird } from './hungwe-bird'

export function IntroAnimation() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-900 text-white transition-opacity">
      <HungweBird className="w-24 h-24 mb-4" animate />
      <h1 className="text-2xl font-bold text-yellow-400">DISMS AI</h1>
      <p className="text-green-300 text-sm mt-1">Digital Information System for Member Services</p>
      <p className="text-green-400 text-xs mt-2">Harare Province — Communities Zimbabwe</p>
      <div className="mt-6 flex gap-1">
        {[0,1,2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
