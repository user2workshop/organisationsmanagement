import client from './client'
import type { Mitarbeiter } from '../types'

export const getMitarbeiter = () =>
  client.get<Mitarbeiter[]>('/mitarbeiter').then(r => r.data)

export const getMitarbeiterById = (id: string) =>
  client.get<Mitarbeiter>(`/mitarbeiter/${id}`).then(r => r.data)

export const createMitarbeiter = (data: Omit<Mitarbeiter, 'id' | 'aktiv' | 'erstelltAm' | 'geaendertAm'>) =>
  client.post<Mitarbeiter>('/mitarbeiter', data).then(r => r.data)

export const updateMitarbeiter = (id: string, data: Omit<Mitarbeiter, 'id' | 'aktiv' | 'erstelltAm' | 'geaendertAm'>) =>
  client.put<Mitarbeiter>(`/mitarbeiter/${id}`, data).then(r => r.data)
