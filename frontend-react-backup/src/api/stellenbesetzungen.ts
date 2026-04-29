import client from './client'
import type { Stellenbesetzung } from '../types'

export const getBesetzungenByMitarbeiter = (mitarbeiterId: string) =>
  client.get<Stellenbesetzung[]>(`/mitarbeiter/${mitarbeiterId}/besetzungen`).then(r => r.data)

export const getBesetzungenByStelle = (stelleId: string) =>
  client.get<Stellenbesetzung[]>(`/stellen/${stelleId}/besetzungen`).then(r => r.data)

export const createStellenbesetzung = (data: {
  stelleId: string
  mitarbeiterId: string
  startDatum: string
  endDatum?: string
  istVerantwortlicher: boolean
  typ: string
}) => client.post<Stellenbesetzung>('/stellenbesetzungen', data).then(r => r.data)

export const beendeStellenbesetzung = (id: string, endDatum: string) =>
  client.post<Stellenbesetzung>(`/stellenbesetzungen/${id}/beenden?endDatum=${endDatum}`).then(r => r.data)
