import { useEffect, useState } from 'react'
import { getKostenstellen, createKostenstelle, pruefeUeberschneidung } from '../api/kostenstellen'
import type { Kostenstelle } from '../types'

export default function KostenstellenPage() {
  const [kostenstellen, setKostenstellen] = useState<Kostenstelle[]>([])
  const [ueberschneidungen, setUeberschneidungen] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nummer: '', bezeichnung: '', gueltigAb: '', gueltigBis: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    const list = await getKostenstellen()
    setKostenstellen(list)
    const pruefen = await Promise.all(
      list.map(k => pruefeUeberschneidung(k.id).then(r => ({ id: k.id, hat: r.hatUeberschneidung })))
    )
    setUeberschneidungen(new Set(pruefen.filter(p => p.hat).map(p => p.id)))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await createKostenstelle({ ...form, gueltigBis: form.gueltigBis || undefined })
      setShowForm(false)
      setForm({ nummer: '', bezeichnung: '', gueltigAb: '', gueltigBis: '' })
      load()
    } catch {
      setError('Kostenstelle konnte nicht gespeichert werden.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Kostenstellen</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + Kostenstelle anlegen
        </button>
      </div>

      {ueberschneidungen.size > 0 && (
        <div className="mb-4 rounded-lg bg-amber-50 border border-amber-300 p-4">
          <p className="font-semibold text-amber-800">
            ⚠ {ueberschneidungen.size} Kostenstelle{ueberschneidungen.size > 1 ? 'n' : ''} mit mehrfacher OE-Zuordnung
          </p>
        </div>
      )}

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Neue Kostenstelle</h2>
          {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {[
              ['nummer', 'Nummer', false],
              ['bezeichnung', 'Bezeichnung', false],
              ['gueltigAb', 'Gültig ab', false],
              ['gueltigBis', 'Gültig bis (optional)', true],
            ].map(([field, label, optional]) => (
              <div key={field as string}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label as string}</label>
                <input
                  type={String(field).includes('gueltig') ? 'date' : 'text'}
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field as string]: e.target.value }))}
                  required={!optional}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
            <div className="col-span-2 flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Abbrechen
              </button>
              <button type="submit" disabled={saving}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Speichern...' : 'Speichern'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Lade Kostenstellen...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Nummer', 'Bezeichnung', 'Gültig ab', 'Gültig bis', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kostenstellen.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    Keine Kostenstellen vorhanden
                  </td>
                </tr>
              ) : (
                kostenstellen.map(k => (
                  <tr key={k.id} className={`hover:bg-gray-50 ${ueberschneidungen.has(k.id) ? 'bg-amber-50' : ''}`}>
                    <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">{k.nummer}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{k.bezeichnung}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{k.gueltigAb}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{k.gueltigBis ?? '–'}</td>
                    <td className="px-4 py-3">
                      {ueberschneidungen.has(k.id) && (
                        <span className="text-xs text-amber-700 font-medium">⚠ Mehrfachzuordnung</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
