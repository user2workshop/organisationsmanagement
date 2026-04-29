import { useCallback, useEffect, useState } from 'react'
import { getMitarbeiter, createMitarbeiter, updateMitarbeiter } from '../api/mitarbeiter'
import { getBesetzungenByMitarbeiter, createStellenbesetzung, beendeStellenbesetzung } from '../api/stellenbesetzungen'
import { getStellen } from '../api/stellen'
import { getFunktionen } from '../api/funktionen'
import { getOrganisationseinheiten } from '../api/organisationseinheiten'
import type { Mitarbeiter, Stelle, Funktion, Organisationseinheit, Stellenbesetzung, BesetzungsTyp } from '../types'

function flattenOes(oes: Organisationseinheit[]): Organisationseinheit[] {
  const result: Organisationseinheit[] = []
  for (const oe of oes) {
    result.push(oe)
    if (oe.kinder?.length) result.push(...flattenOes(oe.kinder))
  }
  return result
}

interface MitarbeiterForm {
  id?: string
  vorname: string
  nachname: string
  email: string
  personalnummer: string
  eintrittsdatum: string
  austrittsdatum: string
}

const emptyForm: MitarbeiterForm = {
  vorname: '', nachname: '', email: '', personalnummer: '',
  eintrittsdatum: '', austrittsdatum: '',
}

interface BesetzungForm {
  mitarbeiterId: string
  stelleId: string
  startDatum: string
  endDatum: string
  istVerantwortlicher: boolean
  typ: BesetzungsTyp
}

const STATUS_STYLE: Record<string, string> = {
  GEPLANT: 'bg-blue-100 text-blue-800',
  AKTIV: 'bg-green-100 text-green-800',
  BEENDET: 'bg-gray-100 text-gray-600',
  STORNIERT: 'bg-red-100 text-red-700',
}

export default function MitarbeiterPage() {
  const [mitarbeiter, setMitarbeiter] = useState<Mitarbeiter[]>([])
  const [stellen, setStellen] = useState<Stelle[]>([])
  const [funktionen, setFunktionen] = useState<Funktion[]>([])
  const [oes, setOes] = useState<Organisationseinheit[]>([])
  const [loading, setLoading] = useState(true)

  const [mitarbeiterModal, setMitarbeiterModal] = useState<MitarbeiterForm | null>(null)
  const [mitarbeiterError, setMitarbeiterError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [besetzungen, setBesetzungen] = useState<Stellenbesetzung[]>([])
  const [besetzungModal, setBesetzungModal] = useState<BesetzungForm | null>(null)
  const [besetzungError, setBesetzungError] = useState<string | null>(null)
  const [savingBesetzung, setSavingBesetzung] = useState(false)

  const flatOes = flattenOes(oes)
  const oeMap = Object.fromEntries(flatOes.map(o => [o.id, o.bezeichnung]))
  const funkMap = Object.fromEntries(funktionen.map(f => [f.id, f.bezeichnung]))
  const stelleMap = Object.fromEntries(stellen.map(s => [s.id, s]))

  const reload = useCallback(() => {
    setLoading(true)
    Promise.all([getMitarbeiter(), getStellen(), getFunktionen(), getOrganisationseinheiten()])
      .then(([m, s, f, o]) => { setMitarbeiter(m); setStellen(s); setFunktionen(f); setOes(o) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { reload() }, [reload])

  async function loadBesetzungen(mitarbeiterId: string) {
    const data = await getBesetzungenByMitarbeiter(mitarbeiterId)
    setBesetzungen(data)
  }

  function toggleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
      loadBesetzungen(id)
    }
  }

  function openCreate() {
    setMitarbeiterError(null)
    setMitarbeiterModal({ ...emptyForm })
  }

  function openEdit(m: Mitarbeiter) {
    setMitarbeiterError(null)
    setMitarbeiterModal({
      id: m.id,
      vorname: m.vorname,
      nachname: m.nachname,
      email: m.email,
      personalnummer: m.personalnummer,
      eintrittsdatum: m.eintrittsdatum,
      austrittsdatum: m.austrittsdatum ?? '',
    })
  }

  async function handleMitarbeiterSave(e: React.FormEvent) {
    e.preventDefault()
    if (!mitarbeiterModal) return
    setSaving(true); setMitarbeiterError(null)
    try {
      const data = {
        vorname: mitarbeiterModal.vorname,
        nachname: mitarbeiterModal.nachname,
        email: mitarbeiterModal.email,
        personalnummer: mitarbeiterModal.personalnummer,
        eintrittsdatum: mitarbeiterModal.eintrittsdatum,
        austrittsdatum: mitarbeiterModal.austrittsdatum || undefined,
      }
      if (mitarbeiterModal.id) await updateMitarbeiter(mitarbeiterModal.id, data as Parameters<typeof updateMitarbeiter>[1])
      else await createMitarbeiter(data as Parameters<typeof createMitarbeiter>[0])
      setMitarbeiterModal(null)
      reload()
    } catch {
      setMitarbeiterError('Speichern fehlgeschlagen.')
    } finally {
      setSaving(false)
    }
  }

  function openBesetzungModal(mitarbeiterId: string) {
    setBesetzungError(null)
    setBesetzungModal({
      mitarbeiterId,
      stelleId: '',
      startDatum: '',
      endDatum: '',
      istVerantwortlicher: false,
      typ: 'HAUPTINHABER',
    })
  }

  async function handleBesetzungSave(e: React.FormEvent) {
    e.preventDefault()
    if (!besetzungModal) return
    if (!besetzungModal.stelleId) { setBesetzungError('Stelle erforderlich.'); return }
    if (!besetzungModal.startDatum) { setBesetzungError('Startdatum erforderlich.'); return }
    setSavingBesetzung(true); setBesetzungError(null)
    try {
      await createStellenbesetzung({
        stelleId: besetzungModal.stelleId,
        mitarbeiterId: besetzungModal.mitarbeiterId,
        startDatum: besetzungModal.startDatum,
        endDatum: besetzungModal.endDatum || undefined,
        istVerantwortlicher: besetzungModal.istVerantwortlicher,
        typ: besetzungModal.typ,
      })
      setBesetzungModal(null)
      loadBesetzungen(besetzungModal.mitarbeiterId)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setBesetzungError(msg ?? 'Zuordnung fehlgeschlagen.')
    } finally {
      setSavingBesetzung(false)
    }
  }

  async function handleBeenden(b: Stellenbesetzung) {
    const endDatum = prompt('Enddatum (JJJJ-MM-TT):', new Date().toISOString().slice(0, 10))
    if (!endDatum) return
    await beendeStellenbesetzung(b.id, endDatum)
    loadBesetzungen(b.mitarbeiterId)
  }

  const aktivStellen = stellen.filter(s => s.status === 'AKTIV')

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Mitarbeiter</h1>
        <button onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          + Mitarbeiter anlegen
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Lade Mitarbeiter…</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['', 'Pers.-Nr.', 'Name', 'E-Mail', 'Eintrittsdatum', 'Status', 'Aktionen'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mitarbeiter.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Keine Mitarbeiter vorhanden</td></tr>
              ) : mitarbeiter.map(m => (
                <>
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-2 py-3 text-center">
                      <button onClick={() => toggleExpand(m.id)}
                        className="text-gray-400 hover:text-gray-700 text-sm w-6">
                        {expandedId === m.id ? '▼' : '▶'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">{m.personalnummer}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{m.vorname} {m.nachname}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{m.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{m.eintrittsdatum}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${m.aktiv ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {m.aktiv ? 'Aktiv' : 'Ausgetreten'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => openEdit(m)}
                        className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700">
                        Bearbeiten
                      </button>
                    </td>
                  </tr>

                  {expandedId === m.id && (
                    <tr key={`${m.id}-expand`}>
                      <td colSpan={7} className="bg-blue-50 px-8 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-gray-700">Stellenbesetzungen</p>
                          <button onClick={() => openBesetzungModal(m.id)}
                            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                            + Stelle zuordnen
                          </button>
                        </div>
                        {besetzungen.length === 0 ? (
                          <p className="text-sm text-gray-400">Keine Stellenbesetzungen vorhanden.</p>
                        ) : (
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-xs text-gray-500 uppercase">
                                <th className="text-left pb-1 pr-4">Stelle</th>
                                <th className="text-left pb-1 pr-4">OE</th>
                                <th className="text-left pb-1 pr-4">Funktion</th>
                                <th className="text-left pb-1 pr-4">Typ</th>
                                <th className="text-left pb-1 pr-4">Von</th>
                                <th className="text-left pb-1 pr-4">Bis</th>
                                <th className="text-left pb-1 pr-4">Status</th>
                                <th className="text-left pb-1"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-100">
                              {besetzungen.map(b => {
                                const stelle = stelleMap[b.stelleId]
                                return (
                                  <tr key={b.id}>
                                    <td className="py-1.5 pr-4 font-medium">{stelle?.bezeichnung ?? b.stelleId}</td>
                                    <td className="py-1.5 pr-4 text-gray-600">{stelle ? oeMap[stelle.organisationseinheitId] ?? '–' : '–'}</td>
                                    <td className="py-1.5 pr-4 text-gray-600">{stelle ? funkMap[stelle.funktionId] ?? '–' : '–'}</td>
                                    <td className="py-1.5 pr-4 text-gray-600">{b.typ}</td>
                                    <td className="py-1.5 pr-4 text-gray-600">{b.startDatum}</td>
                                    <td className="py-1.5 pr-4 text-gray-600">{b.endDatum ?? '–'}</td>
                                    <td className="py-1.5 pr-4">
                                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_STYLE[b.status]}`}>{b.status}</span>
                                    </td>
                                    <td className="py-1.5">
                                      {b.status === 'AKTIV' && (
                                        <button onClick={() => handleBeenden(b)}
                                          className="text-xs px-2 py-0.5 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
                                          Beenden
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mitarbeiter create/edit modal */}
      {mitarbeiterModal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4">
              {mitarbeiterModal.id ? 'Mitarbeiter bearbeiten' : 'Mitarbeiter anlegen'}
            </h2>
            {mitarbeiterError && <p className="text-red-600 text-sm mb-3">{mitarbeiterError}</p>}
            <form onSubmit={handleMitarbeiterSave} className="grid grid-cols-2 gap-4">
              {([
                ['vorname', 'Vorname', 'text', true],
                ['nachname', 'Nachname', 'text', true],
                ['email', 'E-Mail', 'email', true],
                ['personalnummer', 'Personalnummer', 'text', true],
                ['eintrittsdatum', 'Eintrittsdatum', 'date', true],
                ['austrittsdatum', 'Austrittsdatum (optional)', 'date', false],
              ] as [keyof MitarbeiterForm, string, string, boolean][]).map(([field, label, type, required]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={mitarbeiterModal[field] as string}
                    onChange={e => setMitarbeiterModal(f => f && ({ ...f, [field]: e.target.value }))}
                    required={required}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="col-span-2 flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setMitarbeiterModal(null)}
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

      {/* Stellenbesetzung modal */}
      {besetzungModal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold mb-4">Stelle zuordnen</h2>
            <form onSubmit={handleBesetzungSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stelle *</label>
                <select value={besetzungModal.stelleId}
                  onChange={e => setBesetzungModal(m => m && ({ ...m, stelleId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">– bitte wählen –</option>
                  {aktivStellen.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.bezeichnung} · {oeMap[s.organisationseinheitId] ?? '?'} · {funkMap[s.funktionId] ?? '?'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Startdatum *</label>
                  <input type="date" value={besetzungModal.startDatum}
                    onChange={e => setBesetzungModal(m => m && ({ ...m, startDatum: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enddatum</label>
                  <input type="date" value={besetzungModal.endDatum}
                    onChange={e => setBesetzungModal(m => m && ({ ...m, endDatum: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Besetzungstyp *</label>
                <select value={besetzungModal.typ}
                  onChange={e => setBesetzungModal(m => m && ({ ...m, typ: e.target.value as BesetzungsTyp }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="HAUPTINHABER">Hauptinhaber</option>
                  <option value="INTERIMINHABER">Interiminhaber</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="istVerantwortlicher" checked={besetzungModal.istVerantwortlicher}
                  onChange={e => setBesetzungModal(m => m && ({ ...m, istVerantwortlicher: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <label htmlFor="istVerantwortlicher" className="text-sm text-gray-700">Ist Verantwortlicher (Leitungsfunktion)</label>
              </div>
              {besetzungError && <p className="text-red-600 text-sm">{besetzungError}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setBesetzungModal(null)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Abbrechen</button>
                <button type="submit" disabled={savingBesetzung}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {savingBesetzung ? 'Zuordnen…' : 'Zuordnen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
