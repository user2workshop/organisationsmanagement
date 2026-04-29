# Demand: Organisationsmanagement

**Erstellt am**: 2026-04-27
**Status**: Neu

---

## 1. Wer?

### Inquiring Person
Lara, Product Owner, support@test.de

### Main Stakeholder
Dirk, Geschäftsführer

---

## 2. Warum?

### Business Motivation
Ich bin Controller und versuche, zu jedem Zeitpunkt die verantwortliche Person für eine Organisationseinheit zu ermitteln, aber bei Ausfall oder Weggang eines Mitarbeiters ist die Hierarchie unterbrochen und keine automatische Nachfolge geregelt, weil Vertretungsregelungen und Organisationsstrukturen nicht systematisch erfasst sind, was dazu führt, dass Verantwortlichkeiten unklar sind und Kostenstellen sich zwischen Abteilungen überschneiden.

### Motivation & Treiber
**Typ**: Operativ

Engpass und Fehlerquelle im Tagesgeschäft: Bei ungeplanten Abwesenheiten oder Abgängen kann die verantwortliche Person nicht automatisch ermittelt werden. Kostenstellen-Überschneidungen führen zu fehlerhaften Zuordnungen und erschweren die Steuerung.

### Justification Reasons
- Risikominimierung
- Mitarbeiterzufriedenheit

### Business Value & Nutzen
Durch die Umsetzung erhalten alle Mitarbeiter die Möglichkeit, zu jedem Zeitpunkt ihren direkten Ansprechpartner zu ermitteln, was zu reduzierten Abstimmungsaufwänden führt. Zusätzlich werden falsch zugeordnete Kosten minimiert und Kostenstellen-basierte Entscheidungen werden präziser.

**Quantifizierung**:
- Finanziell: Reduktion fehlerhafter Kostenstellen-Zuordnungen (Betrag nicht bekannt / wird nachgeliefert)
- Effizienz: Reduzierter Abstimmungsaufwand durch klare Ansprechpartner (Stunden nicht beziffert)
- Qualität: Korrektere Entscheidungsgrundlage durch präzise Kostenstellendaten
- Risiko: Eliminierung von Verantwortlichkeitslücken bei Ausfall oder Abgang
- Strategisch: Nicht bekannt
- Mitarbeiter: Klarere Strukturen und Ansprechpartner für alle Mitarbeitenden

### Ziele & Erwartete Ergebnisse (OKR)

**Objective (O)**: Die Organisationsverwaltung soll jederzeit transparent und lückenlos sein und über eine Schnittstelle abfragbar sein.

**Key Results**:
1. Ungeklärte Vertretungsfälle — Baseline: nicht bekannt (wird nachgeliefert) → Target: 0/Monat

### Cost of Delay
Wenn dieser Demand nicht bis 08.06.2026 umgesetzt wird, droht eine Verzögerung des geplanten Starts des neuen Organisationsmanagements. Finanzielle Einbußen werden nicht erwartet, jedoch verbleiben Risiken durch ungeklärte Verantwortlichkeiten und fehlerhafte Kostenstellen-Zuordnungen.

**Details**:
- Finanzielle Kosten: Keine direkten finanziellen Einbußen erwartet
- Opportunitätskosten: Verzögerter Start des Organisationsmanagements
- Compliance-Risiken: Nicht bekannt
- Wettbewerbsrisiken: Nicht bekannt

---

## 3. Was?

### Beschreibung

**Kernfunktionen**:
- Mitarbeiter in einer Organisationsstruktur verwalten (Funktionen, Abteilungen, Hierarchien)
- Vorgesetzte und Vertretungen abbilden — auch bei unbesetzten Stellen
- Automatische Aktivierung von Vertretungsregelungen bei geplanten Abwesenheiten (Urlaub, Krankheit) zum definierten Zeitraum
- Kostenstellen-Zuordnung je Organisationseinheit
- Jeder Leitungsfunktion ist zu jedem Zeitpunkt eine Person zugeordnet (dauerhaft oder temporär)
- Schnittstelle (API) zur Abfrage der Organisationsdaten für abnehmende Systeme

**Daten**:
- Mitarbeiterstammdaten
- Funktionen & Abteilungen
- Kostenstellen-Zuordnungen
- Vertretungsregelungen inkl. Zeiträume (geplante Abwesenheiten)
- Hierarchiebeziehungen (Vorgesetzte, Vertretungen)

**Primäre Nutzer**:
- Controller
- Personalabteilung

**Qualitätsanforderungen**:
- Performance: Standard
- Verfügbarkeit: Standard
- Sicherheit: Rollenbasierter Zugriff (Lesezugriff für alle Mitarbeiter, Schreibzugriff für Controller und HR)

### Systemkontext

**Akteure/Nutzer**: Controller und Personalabteilung pflegen Daten; alle Mitarbeiter haben Lesezugriff zur Ansprechpartner-Ermittlung; abnehmende Systeme konsumieren Daten über die Schnittstelle.

**Nachbarsysteme**: Das neue System ist das führende System (Single Source of Truth) für Organisationsdaten. Es stellt anderen (abnehmenden) Systemen eine Schnittstelle bereit. Keine Datenübernahme aus Vorsystemen geplant.

**Betroffene Prozesse**:
- Vertretungsregelungen & Abwesenheitsmanagement
- Kostenstellenabrechnung
- Ermittlung von Vorgesetzten & Verantwortlichen

### Systemabgrenzung (Out-of-Scope)

**Ausgeschlossene Funktionen**:
- Urlaubsgenehmigung (das System steuert nur die Vertretung, genehmigt nicht)
- Gehaltsabrechnung

**Nicht betroffene Nutzergruppen**:
- Keine weiteren Einschränkungen definiert

**Nicht integrierte Systeme**:
- Gehaltsabrechnungssysteme

---

## 4. Weitere Attribute

**Impediment**: Nein

**Impediment Note**: —

**Wunschtermin**: 08.06.2026

---

## Nächste Schritte

Dieser Demand wurde erfasst und wartet auf:
1. Bewertung und Priorisierung
2. Freigabe durch Demand Management
3. Überführung in Requirements Engineering (requirements-engineer Agent)

---

*Dokumentiert mit dem demand-manager Agent*
