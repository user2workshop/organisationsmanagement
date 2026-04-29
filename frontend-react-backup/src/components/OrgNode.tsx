import { useState } from 'react'
import type { Organisationseinheit } from '../types'
import StatusBadge from './StatusBadge'

interface Props {
  node: Organisationseinheit
  depth?: number
  onEdit: (oe: Organisationseinheit) => void
  onAddChild: (parentId: string) => void
  onActivate: (id: string) => void
  onDeactivate: (id: string) => void
  onAufloesen: (id: string) => void
  onDelete: (id: string) => void
}

const TYP_LABEL: Record<string, string> = {
  BEREICH: 'Bereich',
  ABTEILUNG: 'Abteilung',
  TEAM: 'Team',
  STABSSTELLE: 'Stabsstelle',
}

export default function OrgNode({ node, depth = 0, onEdit, onAddChild, onActivate, onDeactivate, onAufloesen, onDelete }: Props) {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.kinder && node.kinder.length > 0
  const { status } = node

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="flex items-center gap-2 py-2 hover:bg-gray-50 rounded px-2 group">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-gray-400 hover:text-gray-600 w-5 h-5 flex items-center justify-center flex-shrink-0"
          >
            {expanded ? '▼' : '▶'}
          </button>
        ) : (
          <span className="w-5 flex-shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          <span className="font-medium text-gray-900">{node.bezeichnung}</span>
          <span className="ml-2 text-xs text-gray-500">{TYP_LABEL[node.typ] ?? node.typ}</span>
          {node.kostenstelleId && (
            <span className="ml-2 text-xs text-gray-400">KST: {node.kostenstelleId}</span>
          )}
        </div>

        <StatusBadge status={status} />

        {/* Action buttons – visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(node)}
            title="Bearbeiten"
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700"
          >
            Bearbeiten
          </button>

          {status !== 'AUFGELOEST' && (
            <button
              onClick={() => onAddChild(node.id)}
              title="Untereinheit hinzufügen"
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700"
            >
              + Untereinheit
            </button>
          )}

          {status === 'ENTWURF' && (
            <button
              onClick={() => onActivate(node.id)}
              title="Aktivieren"
              className="text-xs px-2 py-1 rounded bg-green-100 hover:bg-green-200 text-green-700"
            >
              Aktivieren
            </button>
          )}

          {status === 'AKTIV' && (
            <button
              onClick={() => onDeactivate(node.id)}
              title="Deaktivieren"
              className="text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
            >
              Deaktivieren
            </button>
          )}

          {(status === 'AKTIV' || status === 'INAKTIV') && (
            <button
              onClick={() => onAufloesen(node.id)}
              title="Auflösen"
              className="text-xs px-2 py-1 rounded bg-orange-100 hover:bg-orange-200 text-orange-700"
            >
              Auflösen
            </button>
          )}

          {status === 'ENTWURF' && (
            <button
              onClick={() => onDelete(node.id)}
              title="Löschen"
              className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700"
            >
              Löschen
            </button>
          )}
        </div>
      </div>

      {expanded && hasChildren && (
        <div>
          {node.kinder.map(kind => (
            <OrgNode
              key={kind.id}
              node={kind}
              depth={depth + 1}
              onEdit={onEdit}
              onAddChild={onAddChild}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
              onAufloesen={onAufloesen}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
