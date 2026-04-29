import client from './client'
import type { Warnung } from '../types'

export const getUnbesetzteLeitungsfunktionen = () =>
  client.get<Warnung[]>('/warnungen/unbesetzte-leitungsfunktionen').then(r => r.data)
