'use client'

import { useEffect, useRef } from 'react'

interface HungweBirdProps {
  className?: string
  animate?: boolean
}

export function HungweBird({ className = 'w-16 h-16', animate = true }: HungweBirdProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="50" cy="60" rx="20" ry="15" fill="#166534" />
      {/* Head */}
      <circle cx="50" cy="38" r="12" fill="#166534" />
      {/* Beak */}
      <polygon points="50,32 58,36 50,40" fill="#fbbf24" />
      {/* Eye */}
      <circle cx="53" cy="35" r="2" fill="white" />
      <circle cx="53" cy="35" r="1" fill="#171717" />
      {/* Wings */}
      <ellipse cx="30" cy="58" rx="15" ry="8" fill="#15803d" transform="rotate(-20 30 58)" />
      <ellipse cx="70" cy="58" rx="15" ry="8" fill="#15803d" transform="rotate(20 70 58)" />
      {/* Tail */}
      <ellipse cx="50" cy="75" rx="8" ry="12" fill="#14532d" />
      {/* Crest */}
      <path d="M 46 28 Q 50 15 54 28" stroke="#fbbf24" strokeWidth="2" fill="none" />
    </svg>
  )
}
