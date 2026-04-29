const colorMap: Record<string, string> = {
  AKTIV: 'bg-green-100 text-green-800',
  GEPLANT: 'bg-blue-100 text-blue-800',
  BEENDET: 'bg-gray-100 text-gray-600',
  STORNIERT: 'bg-red-100 text-red-700',
  ENTWURF: 'bg-yellow-100 text-yellow-800',
  INAKTIV: 'bg-orange-100 text-orange-700',
  AUFGELOEST: 'bg-red-100 text-red-700',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colorMap[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}
