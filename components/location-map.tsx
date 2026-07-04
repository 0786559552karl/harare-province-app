'use client'

import { useEffect, useRef, useState } from 'react'

export function LocationMap() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        // Log to server
        fetch('/api/log-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        }).catch(() => {})
      },
      () => setError('Location access denied')
    )
  }, [])

  if (error) return <p className="text-xs text-muted-foreground">{error}</p>
  if (!coords) return <p className="text-xs text-muted-foreground">Getting location...</p>

  return (
    <div className="text-xs text-muted-foreground">
      <span>Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}</span>
    </div>
  )
}
