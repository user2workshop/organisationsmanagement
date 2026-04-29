import client from './client'
import type { Funktion } from '../types'

export const getFunktionen = () =>
  client.get<Funktion[]>('/funktionen').then(r => r.data)

export const createFunktion = (data: { bezeichnung: string; istLeitungsfunktion: boolean }) =>
  client.post<Funktion>('/funktionen', data).then(r => r.data)
