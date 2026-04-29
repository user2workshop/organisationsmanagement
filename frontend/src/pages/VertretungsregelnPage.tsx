import { useEffect, useState } from 'react'
import { getVertretungsregeln, createVertretungsregel, storniereVertretungsregel } from '../api/vertretungsregeln'
import type { Vertretungsregel, VertretungsregelStatus, Vertretungsgrund } from '../types'
import StatusBadge from '../components/StatusBadge'

const GRUENDE: Vertretungsgrund[] = ['URLAUB', 'KRANKHEIT', 'POSITIONSWECHSEL', 'SONSTIGE']
const STATUSFILTER: Array<VertretungsregelStatus | 'ALLE'> = ['ALLE', 'GEPLANT', 'AKTIV', 'BEENDET', 'STORNIERT']

const emptyForm = {
  stelleId: '', vertretungspersonId: '', startDatum: '', endDatum: '', grund: 'URLAUB' as Vertretungsgrund,
}

export default function VertretungsregelnPage() {
  const [regeln, setRegeln] = useState<Vertretungsregel[]>([])
  const [filter, setFilter] = useState<VertretungsregelStatus | 'ALLE'>('ALLE')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    getVertretungsregeln(filter === 'ALLE' ? undefined : filter)
      .then(setRegeln)
      .finally(() => setLoading(false))
  }

  useEffect(load, [filter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await createVertretungsregel(form)
      setShowForm(false)
      setForm(emptyForm)
      load()
    } catch {
      setError('Vertretungsregel konnte nicht gespeichert werden.')
    } finally {
      setSaving(false)
    }
  }

  const handleStornieren = async (id: string) => {
    if (!confirm('Vertretungsregel stornieren?')) return
    try {
      await storniereVertretungsregel(id)
      load()
    } catch {
      alert('Stornierung fehlgeschlagen.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Vertretungsregeln</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          + Vertretungsregel anlegen
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {STATUSFILTER.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
              filter === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Neue Vertretungsregel</h2>
          {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stellen-ID</label>
              <input type="text" value={form.stelleId} onChange={e => setForm(f => ({ ...f, stelleId: e.target.value }))}
                required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vertretungsperson-ID</label>
              <input type="text" value={form.vertretungspersonId} onChange={e => setForm(f => ({ ...f, vertretungspersonId: e.target.value }))}
                required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Von</label>
              <input type="date" value={form.startDatum} onChange={e => setForm(f => ({ ...f, startDatum: e.target.value }))}
                required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bis</label>
              <input type="date" value={form.endDatum} onChange={e => setForm(f => ({ ...f, endDatum: e.target.value }))}
                required className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grund</label>
              <select value={form.grund} onChange={e => setForm(f => ({ ...f, grund: e.target.value as Vertretungsgrund }))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                {GRUENDE.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-2 justify-end">
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
        <p className="text-gray-500">Lade Vertretungsregeln...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Stelle', 'Vertretungsperson', 'Von', 'Bis', 'Grund', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {regeln.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Keine Vertretungsregeln vorhanden
                  </td>
                </tr>
              ) : (
                regeln.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">{r.stelleId.substring(0, 8)}…</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">{r.vertretungspersonId.substring(0, 8)}…</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.startDatum}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.endDatum}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.grund}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      {(r.status === 'GEPLANT' || r.status === 'AKTIV') && (
                        <button
                          onClick={() => handleStornieren(r.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Stornieren
                        </button>
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
