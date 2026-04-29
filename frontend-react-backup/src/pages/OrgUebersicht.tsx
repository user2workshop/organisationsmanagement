import { useCallback, useEffect, useState } from 'react'
import {
  getOrganisationseinheiten,
  createOrganisationseinheit,
  updateOrganisationseinheit,
  aktiviereOrganisationseinheit,
  deaktiviereOrganisationseinheit,
  loeseDie,
  deleteOrganisationseinheit,
} from '../api/organisationseinheiten'
import { getKostenstellen } from '../api/kostenstellen'
import type { Organisationseinheit, Kostenstelle } from '../types'
import OrgNode from '../components/OrgNode'
import OrgFormModal from '../components/OrgFormModal'
import WarnungBanner from '../components/WarnungBanner'

type ModalState =
  | { mode: 'create'; parentId?: string }
  | { mode: 'edit'; oe: Organisationseinheit }
  | null

export default function OrgUebersicht() {
  const [oes, setOes] = useState<Organisationseinheit[]>([])
  const [kostenstellen, setKostenstellen] = useState<Kostenstelle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const reload = useCallback(() => {
    setLoading(true)
    Promise.all([getOrganisationseinheiten(), getKostenstellen()])
      .then(([oesData, ksData]) => {
        setOes(oesData)
        setKostenstellen(ksData)
        setError(null)
      })
      .catch(() => setError('Daten konnten nicht geladen werden.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { reload() }, [reload])

  async function handleSave(data: Partial<Organisationseinheit>) {
    if (modal?.mode === 'edit') {
      await updateOrganisationseinheit(modal.oe.id, data)
    } else {
      await createOrganisationseinheit(data)
    }
    reload()
  }

  async function handleActivate(id: string) {
    await aktiviereOrganisationseinheit(id)
    reload()
  }

  async function handleDeactivate(id: string) {
    if (!confirm('Organisationseinheit deaktivieren?')) return
    await deaktiviereOrganisationseinheit(id)
    reload()
  }

  async function handleAufloesen(id: string) {
    if (!confirm('Organisationseinheit endgültig auflösen? Dies kann nicht rückgängig gemacht werden.')) return
    await loeseDie(id)
    reload()
  }

  async function handleDelete(id: string) {
    if (!confirm('Organisationseinheit löschen?')) return
    await deleteOrganisationseinheit(id)
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Organisationsübersicht</h1>
        <button
          onClick={() => setModal({ mode: 'create' })}
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + Neue Organisationseinheit
        </button>
      </div>

      <WarnungBanner />

      {loading && <p className="text-gray-500 mt-4">Lade Organisationsstruktur…</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && oes.length === 0 && (
        <div className="text-center py-16 text-gray-400 bg-white rounded-lg shadow mt-4">
          <p className="text-lg">Keine Organisationseinheiten vorhanden.</p>
          <p className="text-sm mt-1">Legen Sie mit „+ Neue Organisationseinheit" die erste Einheit an.</p>
        </div>
      )}

      {!loading && oes.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
          {oes.map(oe => (
            <OrgNode
              key={oe.id}
              node={oe}
              onEdit={oe => setModal({ mode: 'edit', oe })}
              onAddChild={parentId => setModal({ mode: 'create', parentId })}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              onAufloesen={handleAufloesen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modal && (
        <OrgFormModal
          mode={modal.mode}
          initial={modal.mode === 'edit' ? modal.oe : undefined}
          parentId={modal.mode === 'create' ? modal.parentId : undefined}
          allOes={oes}
          kostenstellen={kostenstellen}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
