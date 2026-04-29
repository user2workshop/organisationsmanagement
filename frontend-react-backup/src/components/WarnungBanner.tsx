import { useEffect, useState } from 'react'
import { getUnbesetzteLeitungsfunktionen } from '../api/warnungen'
import type { Warnung } from '../types'

export default function WarnungBanner() {
  const [warnungen, setWarnungen] = useState<Warnung[]>([])

  useEffect(() => {
    getUnbesetzteLeitungsfunktionen().then(setWarnungen).catch(() => {})
  }, [])

  if (warnungen.length === 0) return null

  return (
    <div className="mb-4 rounded-lg bg-amber-50 border border-amber-300 p-4">
      <div className="flex items-start gap-2">
        <span className="text-amber-600 font-bold text-lg">⚠</span>
        <div>
          <p className="font-semibold text-amber-800">
            {warnungen.length} Leitungsfunktion{warnungen.length > 1 ? 'en' : ''} ohne Verantwortlichen
          </p>
          <ul className="mt-1 text-sm text-amber-700 list-disc list-inside">
            {warnungen.map(w => (
              <li key={w.stelleId}>{w.bezeichnung}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
