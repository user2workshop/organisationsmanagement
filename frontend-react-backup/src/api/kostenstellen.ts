import client from './client'
import type { Kostenstelle } from '../types'

export const getKostenstellen = () =>
  client.get<Kostenstelle[]>('/kostenstellen').then(r => r.data)

export const createKostenstelle = (data: Partial<Kostenstelle>) =>
  client.post<Kostenstelle>('/kostenstellen', data).then(r => r.data)

export const pruefeUeberschneidung = (id: string) =>
  client.get<{ hatUeberschneidung: boolean }>(`/kostenstellen/${id}/ueberschneidung`).then(r => r.data)
