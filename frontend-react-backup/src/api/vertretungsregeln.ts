import client from './client'
import type { Vertretungsregel, VertretungsregelStatus, Vertretungsgrund } from '../types'

export const getVertretungsregeln = (status?: VertretungsregelStatus) =>
  client.get<Vertretungsregel[]>('/vertretungsregeln', { params: status ? { status } : {} }).then(r => r.data)

export const getAktiveVertretungen = () =>
  client.get<Vertretungsregel[]>('/vertretungsregeln/aktiv').then(r => r.data)

export const createVertretungsregel = (data: {
  stelleId: string
  vertretungspersonId: string
  startDatum: string
  endDatum: string
  grund: Vertretungsgrund
}) => client.post<Vertretungsregel>('/vertretungsregeln', data).then(r => r.data)

export const storniereVertretungsregel = (id: string) =>
  client.delete<Vertretungsregel>(`/vertretungsregeln/${id}`).then(r => r.data)
