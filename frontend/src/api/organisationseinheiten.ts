import client from './client'
import type { Organisationseinheit, VerantwortlicherInfo } from '../types'

export const getOrganisationseinheiten = () =>
  client.get<Organisationseinheit[]>('/organisationseinheiten').then(r => r.data)

export const getOrganisationseinheitById = (id: string) =>
  client.get<Organisationseinheit>(`/organisationseinheiten/${id}`).then(r => r.data)

export const getVerantwortlicher = (id: string) =>
  client.get<VerantwortlicherInfo>(`/organisationseinheiten/${id}/verantwortlicher`).then(r => r.data)

export const createOrganisationseinheit = (data: Partial<Organisationseinheit>) =>
  client.post<Organisationseinheit>('/organisationseinheiten', data).then(r => r.data)

export const updateOrganisationseinheit = (id: string, data: Partial<Organisationseinheit>) =>
  client.put<Organisationseinheit>(`/organisationseinheiten/${id}`, data).then(r => r.data)

export const aktiviereOrganisationseinheit = (id: string) =>
  client.post<Organisationseinheit>(`/organisationseinheiten/${id}/aktivieren`).then(r => r.data)

export const deaktiviereOrganisationseinheit = (id: string) =>
  client.post<Organisationseinheit>(`/organisationseinheiten/${id}/deaktivieren`).then(r => r.data)

export const loeseDie = (id: string) =>
  client.post<Organisationseinheit>(`/organisationseinheiten/${id}/aufloesen`).then(r => r.data)

export const deleteOrganisationseinheit = (id: string) =>
  client.delete(`/organisationseinheiten/${id}`)
