import { useCallback, useEffect, useState } from 'react'
import { getStellen, createStelle, updateStelle, aktiviereStelle } from '../api/stellen'
import { getOrganisationseinheiten } from '../api/organisationseinheiten'
import { getFunktionen } from '../api/funktionen'
import type { Stelle, Organisationseinheit, Funktion, Stellentyp, StelleStatus } from '../types'

const STELLENTYP_LABEL: Record<Stellentyp, string> = { VOLLZEIT: 'Vollzeit', TEILZEIT: 'Teilzeit' }
const STATUS_STYLE: Record<StelleStatus, string> = {
  ENTWURF: 'bg-gray-100 text-gray-700',
  AKTIV: 'bg-green-100 text-green-800',
  INAKTIV: 'bg-yellow-100 text-yellow-800',
  AUFGELOEST: 'bg-red-100 text-red-700',
}

function flattenOes(oes: Organisationseinheit[]): Organisationseinheit[] {
  const result: Organisationseinheit[] = []
  for (const oe of oes) {
    result.push(oe)
    if (oe.kinder?.length) result.push(...flattenOes(oe.kinder))
  }
  return result
}

interface FormState {
  id?: string
  bezeichnung: string
  stellentyp: Stellentyp
  organisationseinheitId: string
  funktionId: string
  gueltigAb: string
  gueltigBis: string
}

const emptyForm: FormState = {
  bezeichnung: '', stellentyp: 'VOLLZEIT', organisationseinheitId: '',
  funktionId: '', gueltigAb: '', gueltigBis: '',
}

export default function StellenPage() {
  const [stellen, setStellen] = useState<Stelle[]>([])
  const [oes, setOes] = useState<Organisationseinheit[]>([])
  const [funktionen, setFunktionen] = useState<Funktion[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<FormState | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const flatOes = flattenOes(oes)
  const oeMap = Object.fromEntries(flatOes.map(o => [o.id, o.bezeichnung]))
  const funkMap = Object.fromEntries(funktionen.map(f => [f.id, f.bezeichnung]))

  const reload = useCallback(() => {
    setLoading(true)
    Promise.all([getStellen(), getOrganisationseinheiten(), getFunktionen()])
      .then(([s, o, f]) => { setStellen(s); setOes(o); setFunktionen(f) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { reload() }, [reload])

  function openCreate() { setFormError(null); setModal({ ...emptyForm }) }
  function openEdit(s: Stelle) {
    setFormError(null)
    setModal({
      id: s.id,
      bezeichnung: s.bezeichnung,
      stellentyp: s.stellentyp,
      organisationseinheitId: s.organisationseinheitId,
      funktionId: s.funktionId,
      gueltigAb: s.gueltigAb,
      gueltigBis: s.gueltigBis ?? '',
    })
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!modal) return
    if (!modal.bezeichnung.trim()) { setFormError('Bezeichnung erforderlich.'); return }
    if (!modal.organisationseinheitId) { setFormError('Organisationseinheit erforderlich.'); return }
    if (!modal.funktionId) { setFormError('Funktion erforderlich.'); return }
    if (!modal.gueltigAb) { setFormError('Gültig ab erforderlich.'); return }
    setSaving(true); setFormError(null)
    try {
      const data = {
        bezeichnung: modal.bezeichnung.trim(),
        stellentyp: modal.stellentyp,
        organisationseinheitId: modal.organisationseinheitId,
        funktionId: modal.funktionId,
        gueltigAb: modal.gueltigAb,
        gueltigBis: modal.gueltigBis || undefined,
      }
      if (modal.id) await updateStelle(modal.id, data)
      else await createStelle(data)
      setModal(null)
      reload()
    } catch {
      setFormError('Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  async function handleAktivieren(id: string) {
    await aktiviereStelle(id)
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Stellen</h1>
        <button onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          + Stelle anlegen
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Lade Stellen…</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Bezeichnung', 'Typ', 'Organisationseinheit', 'Funktion', 'Status', 'Aktionen'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stellen.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Keine Stellen vorhanden</td></tr>
              ) : stellen.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.bezeichnung}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{STELLENTYP_LABEL[s.stellentyp]}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{oeMap[s.organisationseinheitId] ?? s.organisationseinheitId}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{funkMap[s.funktionId] ?? s.funktionId}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLE[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(s)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700">
                      Bearbeiten
                    </button>
                    {s.status === 'ENTWURF' && (
                      <button onClick={() => handleAktivieren(s.id)}
                        className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-green-700">
                        Aktivieren
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4">{modal.id ? 'Stelle bearbeiten' : 'Stelle anlegen'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bezeichnung *</label>
                <input type="text" value={modal.bezeichnung}
                  onChange={e => setModal(m => m && ({ ...m, bezeichnung: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stellentyp *</label>
                <select value={modal.stellentyp}
                  onChange={e => setModal(m => m && ({ ...m, stellentyp: e.target.value as Stellentyp }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="VOLLZEIT">Vollzeit</option>
                  <option value="TEILZEIT">Teilzeit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisationseinheit *</label>
                <select value={modal.organisationseinheitId}
                  onChange={e => setModal(m => m && ({ ...m, organisationseinheitId: e.target.value }))}
                  disabled={!!modal.id}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50">
                  <option value="">– bitte wählen –</option>
                  {flatOes.map(o => <option key={o.id} value={o.id}>{o.bezeichnung}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funktion *</label>
                <select value={modal.funktionId}
                  onChange={e => setModal(m => m && ({ ...m, funktionId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">– bitte wählen –</option>
                  {funktionen.map(f => (
                    <option key={f.id} value={f.id}>{f.bezeichnung}{f.istLeitungsfunktion ? ' (Leitungsfunktion)' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gültig ab *</label>
                  <input type="date" value={modal.gueltigAb}
                    onChange={e => setModal(m => m && ({ ...m, gueltigAb: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gültig bis</label>
                  <input type="date" value={modal.gueltigBis}
                    onChange={e => setModal(m => m && ({ ...m, gueltigBis: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              {formError && <p className="text-red-600 text-sm">{formError}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModal(null)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Abbrechen</button>
                <button type="submit" disabled={saving}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Speichern…' : 'Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
