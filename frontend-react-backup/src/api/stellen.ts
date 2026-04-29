import client from './client'
import type { Stelle } from '../types'

export const getStellen = () =>
  client.get<Stelle[]>('/stellen').then(r => r.data)

export const getStelleById = (id: string) =>
  client.get<Stelle>(`/stellen/${id}`).then(r => r.data)

export const getStellenByOe = (oeId: string) =>
  client.get<Stelle[]>(`/stellen?oeId=${oeId}`).then(r => r.data)

export const createStelle = (data: Partial<Stelle>) =>
  client.post<Stelle>('/stellen', data).then(r => r.data)

export const updateStelle = (id: string, data: Partial<Stelle>) =>
  client.put<Stelle>(`/stellen/${id}`, data).then(r => r.data)

export const aktiviereStelle = (id: string) =>
  client.post<Stelle>(`/stellen/${id}/aktivieren`).then(r => r.data)
