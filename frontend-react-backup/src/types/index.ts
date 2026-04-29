export type OETyp = 'ABTEILUNG' | 'TEAM' | 'BEREICH' | 'STABSSTELLE'
export type OEStatus = 'ENTWURF' | 'AKTIV' | 'INAKTIV' | 'AUFGELOEST'
export type Stellentyp = 'VOLLZEIT' | 'TEILZEIT'
export type StelleStatus = 'ENTWURF' | 'AKTIV' | 'INAKTIV' | 'AUFGELOEST'
export type BesetzungsTyp = 'HAUPTINHABER' | 'INTERIMINHABER'
export type StellenbesetzungStatus = 'GEPLANT' | 'AKTIV' | 'BEENDET' | 'STORNIERT'
export type VertretungsregelStatus = 'GEPLANT' | 'AKTIV' | 'BEENDET' | 'STORNIERT'
export type Vertretungsgrund = 'URLAUB' | 'KRANKHEIT' | 'POSITIONSWECHSEL' | 'SONSTIGE'

export interface Mitarbeiter {
  id: string
  vorname: string
  nachname: string
  email: string
  personalnummer: string
  eintrittsdatum: string
  austrittsdatum?: string
  aktiv: boolean
  erstelltAm: string
  geaendertAm: string
}

export interface Funktion {
  id: string
  bezeichnung: string
  istLeitungsfunktion: boolean
  erstelltAm: string
  geaendertAm: string
}

export interface Kostenstelle {
  id: string
  nummer: string
  bezeichnung: string
  gueltigAb: string
  gueltigBis?: string
  erstelltAm: string
  geaendertAm: string
}

export interface Organisationseinheit {
  id: string
  bezeichnung: string
  typ: OETyp
  status: OEStatus
  parentId?: string
  kostenstelleId?: string
  gueltigAb: string
  gueltigBis?: string
  erstelltAm: string
  geaendertAm: string
  kinder: Organisationseinheit[]
}

export interface Stelle {
  id: string
  bezeichnung: string
  stellentyp: Stellentyp
  status: StelleStatus
  organisationseinheitId: string
  funktionId: string
  gueltigAb: string
  gueltigBis?: string
  erstelltAm: string
  geaendertAm: string
}

export interface Stellenbesetzung {
  id: string
  stelleId: string
  mitarbeiterId: string
  startDatum: string
  endDatum?: string
  istVerantwortlicher: boolean
  typ: BesetzungsTyp
  status: StellenbesetzungStatus
  erstelltAm: string
  geaendertAm: string
}

export interface Vertretungsregel {
  id: string
  stelleId: string
  vertretungspersonId: string
  startDatum: string
  endDatum: string
  grund: Vertretungsgrund
  status: VertretungsregelStatus
  erstelltAm: string
  geaendertAm: string
}

export interface VerantwortlicherInfo {
  mitarbeiterId: string
  vorname: string
  nachname: string
  email: string
  istVertretung: boolean
  vertretungsgrund?: string
}

export interface Warnung {
  stelleId: string
  bezeichnung: string
}
