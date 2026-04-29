import { useEffect, useState } from 'react'
import type { OETyp, Organisationseinheit, Kostenstelle } from '../types'

interface Props {
  mode: 'create' | 'edit'
  initial?: Partial<Organisationseinheit>
  parentId?: string
  allOes: Organisationseinheit[]
  kostenstellen: Kostenstelle[]
  onSave: (data: Partial<Organisationseinheit>) => Promise<void>
  onClose: () => void
}

const OE_TYPEN: OETyp[] = ['BEREICH', 'ABTEILUNG', 'TEAM', 'STABSSTELLE']
const TYP_LABEL: Record<OETyp, string> = {
  BEREICH: 'Bereich',
  ABTEILUNG: 'Abteilung',
  TEAM: 'Team',
  STABSSTELLE: 'Stabsstelle',
}

function flattenOes(oes: Organisationseinheit[]): Organisationseinheit[] {
  const result: Organisationseinheit[] = []
  for (const oe of oes) {
    result.push(oe)
    if (oe.kinder?.length) result.push(...flattenOes(oe.kinder))
  }
  return result
}

export default function OrgFormModal({ mode, initial, parentId, allOes, kostenstellen, onSave, onClose }: Props) {
  const [bezeichnung, setBezeichnung] = useState(initial?.bezeichnung ?? '')
  const [typ, setTyp] = useState<OETyp>(initial?.typ ?? 'ABTEILUNG')
  const [selectedParentId, setSelectedParentId] = useState(initial?.parentId ?? parentId ?? '')
  const [kostenstelleId, setKostenstelleId] = useState(initial?.kostenstelleId ?? '')
  const [gueltigAb, setGueltigAb] = useState(initial?.gueltigAb ?? '')
  const [gueltigBis, setGueltigBis] = useState(initial?.gueltigBis ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const flatOes = flattenOes(allOes).filter(o => o.id !== initial?.id)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!bezeichnung.trim()) { setError('Bezeichnung ist erforderlich.'); return }
    if (!gueltigAb) { setError('Gültig ab ist erforderlich.'); return }
    setSaving(true)
    setError(null)
    try {
      await onSave({
        bezeichnung: bezeichnung.trim(),
        typ,
        parentId: selectedParentId || undefined,
        kostenstelleId: kostenstelleId || undefined,
        gueltigAb,
        gueltigBis: gueltigBis || undefined,
      })
      onClose()
    } catch {
      setError('Speichern fehlgeschlagen.')
      setSaving(false)
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {mode === 'create' ? 'Organisationseinheit anlegen' : 'Organisationseinheit bearbeiten'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bezeichnung *</label>
            <input
              type="text"
              value={bezeichnung}
              onChange={e => setBezeichnung(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="z. B. Vertrieb Nord"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Typ *</label>
            <select
              value={typ}
              onChange={e => setTyp(e.target.value as OETyp)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {OE_TYPEN.map(t => (
                <option key={t} value={t}>{TYP_LABEL[t]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Übergeordnete Einheit</label>
            <select
              value={selectedParentId}
              onChange={e => setSelectedParentId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">(keine – Root-Einheit)</option>
              {flatOes.map(o => (
                <option key={o.id} value={o.id}>{o.bezeichnung} ({TYP_LABEL[o.typ]})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kostenstelle</label>
            <select
              value={kostenstelleId}
              onChange={e => setKostenstelleId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">(keine)</option>
              {kostenstellen.map(k => (
                <option key={k.id} value={k.id}>{k.nummer} – {k.bezeichnung}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gültig ab *</label>
              <input
                type="date"
                value={gueltigAb}
                onChange={e => setGueltigAb(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gültig bis</label>
              <input
                type="date"
                value={gueltigBis}
                onChange={e => setGueltigBis(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Speichern…' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
