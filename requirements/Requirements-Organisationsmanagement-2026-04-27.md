# Requirements: Organisationsmanagement

**Erstellt am**: 2026-04-27
**Basiert auf Demand**: [Demand-Organisationsmanagement-2026-04-27.md](../demands/Demand-Organisationsmanagement-2026-04-27.md)
**Status**: In Bearbeitung

---

## 1. Demand-Kontext

### Ursprünglicher Demand
Ein neues führendes IT-System zur Verwaltung der Organisationsstruktur soll eingeführt werden. Inquiring Person: Lara (PO), Sponsor: Dirk (Geschäftsführer). Wunschtermin: 08.06.2026.

### Business Motivation
Als Controller scheitert die Ermittlung verantwortlicher Personen bei Ausfall oder Weggang, weil Hierarchien unterbrochen sind und Vertretungsregelungen nicht systematisch erfasst werden — mit dem Ergebnis unklarer Verantwortlichkeiten und überschneidender Kostenstellen.

---

## 2. Anforderungsübersicht

### Funktionale Anforderungen

- Das System **muss** zu jedem Zeitpunkt für jede Leitungsfunktion genau eine verantwortliche Person ausweisen (Inhaber oder Vertretung).
- Das System **muss** Vertretungsregelungen mit Zeitraum (Start- und Enddatum) unterstützen und diese automatisch aktivieren und deaktivieren.
- Das System **muss** Kostenstellen eindeutig einer Organisationseinheit zuordnen — Überschneidungen sind nicht zulässig.
- Das System **muss** eine API-Schnittstelle für abnehmende Systeme bereitstellen.
- Das System **muss** bei einem geplanten Positionswechsel sicherstellen, dass zu keinem Zeitpunkt zwei Personen gleichzeitig als Verantwortliche einer Leitungsfunktion gelten.
- Vertretungsregelungen **müssen** transparent und logisch nachvollziehbar abgebildet sein (wer, für wen, wann, auf welcher Grundlage).
- Das System **sollte** eine Warnung anzeigen, wenn eine Leitungsfunktion ohne gültige Zuordnung ist.
- Eine Person **kann** neben ihrer Hauptfunktion eine oder mehrere Vertretungsfunktionen wahrnehmen.

---

## 3. Personas

### Persona 1: Klaus

**Profil:**
- **Name**: Klaus
- **Beruf**: Controller — zuständig für Kostenstellenabrechnung und Organisationssteuerung
- **Alter & Familienstand**: 42, verheiratet, zwei Kinder
- **Charakter**: Präzise, strukturiert, ungeduldig bei unklaren Verantwortlichkeiten

**Top 4 Erwartungen:**
1. Zu jedem Zeitpunkt die verantwortliche Person einer Kostenstelle ermitteln können
2. Vertretungsregelungen automatisch und zuverlässig greifen sehen
3. Kostenstellen eindeutig und ohne Überschneidungen zugeordnet wissen
4. Organisationsdaten per Schnittstelle in andere Systeme übertragen können

---

### Persona 2: Sandra

**Profil:**
- **Name**: Sandra
- **Beruf**: HR-Mitarbeiterin — zuständig für Personaladministration und Stammdatenpflege
- **Alter & Familienstand**: 35, ledig
- **Charakter**: Gewissenhaft, kommunikativ, manchmal überlastet durch manuelle Rückfragen

**Top 4 Erwartungen:**
1. Mitarbeiterdaten, Funktionen und Abteilungen einfach und schnell pflegen können
2. Vertretungsregelungen und Abwesenheitszeiträume hinterlegen können
3. Änderungen sofort wirksam sehen — ohne Verzögerung oder manuelle Folgeschritte
4. Klare Rückmeldung erhalten, wenn eine Leitungsfunktion keine zugeordnete Person hat

---

## 4. Problem Statements

### Persona 1: Klaus
„Ich bin Klaus, Controller, und versuche die verantwortliche Person für eine Organisationseinheit zu ermitteln, aber wenn jemand ausfällt oder das Unternehmen verlässt, ist die Hierarchie unterbrochen und keine Vertretung automatisch aktiv, weil Vertretungsregelungen nicht systematisch erfasst sind, was mich zwingt, telefonisch nachzufragen und Kostenstellen manuell zu klären."

### Persona 2: Sandra
„Ich bin Sandra, HR-Mitarbeiterin, und versuche Abwesenheiten und Vertretungen korrekt zu hinterlegen, aber aktuell gibt es kein System, das diese Informationen strukturiert erfasst und automatisch aktiviert, weil Vertretungsregelungen in Mails oder Excel-Tabellen verstreut sind, was dazu führt, dass ich bei jeder Abwesenheit manuell koordinieren muss und trotzdem Fehler passieren."

---

## 5. Customer Journeys

### Journey 1: Verantwortlichen bei Ausfall ermitteln

**Persona**: Klaus (Controller)

**Problem Statement**: Unterbrochene Hierarchie bei Ausfall — kein automatischer Verantwortlicher ermittelbar

**Story**:
Klaus öffnet das Organisationsmanagement-System und navigiert zur betroffenen Abteilung. 😊 Auf einen Blick sieht er die aktuelle Organisationsstruktur mit allen Funktionen und Zuordnungen.

Er klickt auf die Leitungsfunktion des ausgefallenen Abteilungsleiters und sieht sofort: Die hinterlegte Vertretungsregelung ist automatisch aktiv — Max Müller übernimmt die Funktion für den definierten Zeitraum. 😊 Die Kostenstelle ist eindeutig dieser Einheit zugeordnet, keine Überschneidung mit Nachbarabteilungen.

Klaus exportiert die Information direkt oder ruft sie per API in sein Reporting-Tool ab. Die Monatsabrechnung kann korrekt zugeordnet werden — ohne einen einzigen Anruf. 😊

**Detailansicht:**

#### Phase 1: Verantwortlichen ermitteln
- **Touchpoints**: Organisationsmanagement-System
- **Aktionen**: Abteilung aufrufen, Leitungsfunktion öffnen
- **Gedanken/Fragen**: Wer ist gerade verantwortlich? Ist die Kostenstelle korrekt zugeordnet?
- **Emotionen**: 😊 Erleichterung durch sofortige Übersicht
- **Pain Points (heute)**: Hierarchie unterbrochen, kein Verantwortlicher ermittelbar ohne Anruf
- **Opportunities**: Automatische Vertretungsanzeige, keine manuelle Klärung

#### Phase 2: Daten weiterverwenden
- **Touchpoints**: API / Reporting-Tool
- **Aktionen**: Daten per API abrufen oder exportieren
- **Gedanken/Fragen**: Sind die Daten aktuell und verlässlich?
- **Emotionen**: 😊 Vertrauen in die Datenbasis
- **Pain Points (heute)**: Manuelle Übertragung fehleranfällig
- **Opportunities**: Direkte API-Integration eliminiert manuelle Schritte

---

### Journey 2: Vertretung für Abwesenheit hinterlegen

**Persona**: Sandra (HR-Mitarbeiterin)

**Problem Statement**: Vertretungsregelungen verstreut in Mails/Excel — manuelle Koordination fehleranfällig

**Story**:
Sandra erhält die Urlaubsmeldung von Thomas, Teamleiter im Vertrieb. Sie öffnet das Organisationsmanagement-System und ruft sein Mitarbeiterprofil auf. 😊 Sie sieht seine aktuelle Hauptfunktion und die bestehende Organisationseinheit auf einen Blick.

Sandra legt eine neue Vertretungsregelung an: Sie wählt die Vertretungsperson, definiert Start- und Enddatum des Urlaubs und speichert. 😊 Das System bestätigt die Anlage und zeigt ihr direkt an: „Die Vertretung ist ab [Datum] aktiv."

Am ersten Urlaubstag greift die Regelung automatisch — Thomas' Vertretung ist für alle Kollegen und im System als aktiver Ansprechpartner sichtbar. Sandra erhält keine Rückfragen mehr. 😊

Nach Thomas' Rückkehr deaktiviert das System die Vertretung automatisch zum hinterlegten Enddatum. Sandra muss nichts weiter tun.

**Detailansicht:**

#### Phase 1: Vertretungsregel anlegen
- **Touchpoints**: Organisationsmanagement-System, Mitarbeiterprofil
- **Aktionen**: Vertretungsperson auswählen, Zeitraum definieren, speichern
- **Gedanken/Fragen**: Ist die richtige Person hinterlegt? Greift die Regel zum richtigen Zeitpunkt?
- **Emotionen**: 😊 Sicherheit durch strukturierte Eingabe und sofortige Bestätigung
- **Pain Points (heute)**: Kein zentrales System, Vertretungen in Mails/Excel verstreut
- **Opportunities**: Zentrale, strukturierte Erfassung mit automatischer Aktivierung

#### Phase 2: Automatischer Ablauf & Rückkehr
- **Touchpoints**: System (automatisch), alle Mitarbeitenden (als Leser)
- **Aktionen**: Keine — System handelt automatisch
- **Gedanken/Fragen**: Wurde die Vertretung korrekt aktiviert? Endet sie rechtzeitig?
- **Emotionen**: 😊 Entlastung durch Automatisierung
- **Pain Points (heute)**: Manuelle Nachverfolgung und Deaktivierung vergessen
- **Opportunities**: Automatische Deaktivierung, keine Folgeaufwände

---

## 6. Epics

### Epic 1: Organisationsübersicht & Verantwortliche ermitteln

**Beschreibung**: Als Controller kann ich die aktuelle Organisationsstruktur einsehen, Verantwortliche je Organisationseinheit und Kostenstelle ermitteln — auch wenn eine Stelle nicht durch die Hauptperson besetzt ist — und diese Daten per API abrufen.

**Basiert auf Journey**: Journey 1 — Verantwortlichen bei Ausfall ermitteln

**Value Area**: Business

**Acceptance Criteria**:
- Zu jedem Zeitpunkt ist je Leitungsfunktion genau eine Person (Inhaber oder Vertretung) ermittelbar
- Kostenstellen sind eindeutig einer Organisationseinheit zugeordnet, keine Überschneidungen
- Organisationsdaten sind über eine API abfragbar
- Bei geplantem Positionswechsel gilt zu keinem Zeitpunkt mehr als eine Person als Verantwortliche

---

### Epic 2: Vertretungsregelungen verwalten

**Beschreibung**: Als HR-Mitarbeiterin kann ich Vertretungsregelungen mit Zeiträumen hinterlegen. Das System aktiviert und deaktiviert Vertretungen automatisch. Alle Regelungen sind transparent und logisch nachvollziehbar abgebildet.

**Basiert auf Journey**: Journey 2 — Vertretung für Abwesenheit hinterlegen

**Value Area**: Business

**Acceptance Criteria**:
- Vertretungsregelungen können mit Start- und Enddatum angelegt werden
- Aktivierung und Deaktivierung erfolgt automatisch zum definierten Zeitpunkt
- Jede Vertretungsregelung ist transparent einsehbar (wer, für wen, wann, auf welcher Grundlage)
- Eine Leitungsfunktion ohne gültige Zuordnung wird als Warnung angezeigt
- Bei Überlappung Austritt/Eintritt einer Leitungsposition ist ein explizites Übergabedatum zu definieren — davor gilt die alte, danach die neue Person

---

## 7. User Stories

### Epic 1: Organisationsübersicht & Verantwortliche ermitteln

#### Story 1.1: Organisationsstruktur einsehen

**Als** Klaus (Controller)
**möchte ich** die vollständige Organisationsstruktur mit allen Abteilungen, Funktionen und zugeordneten Personen einsehen,
**um** jederzeit einen Überblick über die aktuelle Hierarchie zu haben.

**Akzeptanzkriterien**:
```
Given: Ich bin als Controller angemeldet
When: Ich die Organisationsübersicht öffne
Then: Sehe ich alle Abteilungen, Funktionen und die jeweils zugeordneten Personen in einer strukturierten Ansicht
```

---

#### Story 1.2: Verantwortlichen einer Organisationseinheit ermitteln

**Als** Klaus (Controller)
**möchte ich** für jede Organisationseinheit die aktuell verantwortliche Person sehen — auch wenn die Hauptstelle unbesetzt ist,
**um** Kostenstellen korrekt zuordnen zu können.

**Akzeptanzkriterien**:
```
Given: Eine Leitungsfunktion ist durch Vertretung oder Übergabe besetzt
When: Ich die Organisationseinheit aufrufe
Then: Wird mir genau eine verantwortliche Person angezeigt, mit Hinweis ob es sich um Inhaber oder Vertretung handelt

Given: Eine Leitungsfunktion hat weder Inhaber noch aktive Vertretung
When: Ich die Organisationseinheit aufrufe
Then: Wird eine Warnung angezeigt, dass die Funktion unbesetzt ist
```

---

#### Story 1.3: Kostenstellen-Zuordnung einsehen

**Als** Klaus (Controller)
**möchte ich** je Organisationseinheit die zugeordnete Kostenstelle sehen,
**um** Überschneidungen sofort zu erkennen.

**Akzeptanzkriterien**:
```
Given: Ich rufe eine Organisationseinheit auf
When: Ich die Kostenstellenansicht öffne
Then: Ist genau eine Kostenstelle zugeordnet und eventuelle Konflikte werden als Warnung angezeigt
```

---

#### Story 1.4: Organisationsdaten per API abrufen

**Als** Klaus (Controller)
**möchte ich** Organisationsdaten per API in mein Reporting-Tool übertragen,
**um** manuelle Exports zu vermeiden.

**Akzeptanzkriterien**:
```
Given: Das System ist das führende System für Organisationsdaten
When: Ein externes System eine API-Anfrage stellt
Then: Liefert das System die aktuellen Organisationsdaten inkl. aktiver Verantwortlicher im definierten Format
```

---

### Epic 2: Vertretungsregelungen verwalten

#### Story 2.1: Vertretungsregel anlegen

**Als** Sandra (HR)
**möchte ich** für eine Person eine Vertretungsregelung mit Vertretungsperson und Zeitraum anlegen,
**um** Abwesenheiten strukturiert zu hinterlegen.

**Akzeptanzkriterien**:
```
Given: Ich bin als HR-Mitarbeiterin angemeldet
When: Ich eine neue Vertretungsregelung anlege und Vertretungsperson, Start- und Enddatum eingebe
Then: Ist die Regel gespeichert und wird ab dem Startdatum automatisch aktiv
```

---

#### Story 2.2: Automatische Aktivierung & Deaktivierung

**Als** Sandra (HR)
**möchte ich**, dass Vertretungsregelungen automatisch zum definierten Zeitpunkt greifen und enden,
**um** keine manuelle Nachverfolgung betreiben zu müssen.

**Akzeptanzkriterien**:
```
Given: Eine Vertretungsregel ist mit Start- und Enddatum hinterlegt
When: Das Startdatum erreicht wird
Then: Ist die Vertretungsperson automatisch als Verantwortliche aktiv

Given: Eine Vertretungsregel ist aktiv und das Enddatum wird erreicht
When: Das Enddatum eintritt
Then: Wird die Vertretung automatisch deaktiviert und der ursprüngliche Inhaber wieder als Verantwortlicher angezeigt
```

---

#### Story 2.3: Transparente Übersicht aller Vertretungsregeln

**Als** Sandra (HR)
**möchte ich** alle aktiven, geplanten und abgelaufenen Vertretungsregelungen einsehen,
**um** jederzeit nachvollziehen zu können, wer wen wann vertritt.

**Akzeptanzkriterien**:
```
Given: Ich öffne die Übersicht der Vertretungsregelungen
When: Ich nach Person, Zeitraum oder Status filtere
Then: Sehe ich alle Regeln mit Angabe: wer, für wen, von wann bis wann — transparent und nachvollziehbar
```

---

#### Story 2.4: Leitungsfunktion ohne Zuordnung als Warnung anzeigen

**Als** Sandra (HR)
**möchte ich** eine Warnung erhalten, wenn eine Leitungsfunktion zu einem Zeitpunkt keine zugeordnete Person hat,
**um** rechtzeitig handeln zu können.

**Akzeptanzkriterien**:
```
Given: Für eine Leitungsfunktion ist weder ein Inhaber noch eine aktive Vertretung definiert
When: Dieser Zustand eintritt oder erkannt wird
Then: Zeigt das System eine Warnung an — sichtbar für HR und Controller
```

---

#### Story 2.5: Geplanter Positionswechsel mit Übergabe-Logik

**Als** Sandra (HR)
**möchte ich** bei einem geplanten Wechsel einer Leitungsposition ein explizites Übergabedatum definieren,
**um** sicherzustellen, dass zu jedem Zeitpunkt genau eine Person als Verantwortliche gilt.

**Akzeptanzkriterien**:
```
Given: Ich lege einen Positionswechsel an (Austritt alte Person, Eintritt neue Person mit Überlappung)
When: Ich das Übergabedatum festlege und speichere
Then: Gilt ab diesem Datum die neue Person als Verantwortliche — davor die alte — ohne gleichzeitige Doppelverantwortung

Given: Kein Übergabedatum wurde definiert und eine Überlappung besteht
When: Das System die Konfiguration validiert
Then: Wird eine Fehlermeldung angezeigt, die zur Eingabe eines Übergabedatums auffordert
```

---

## 8. Offene Fragen & Risiken

| # | Frage / Risiko | Verantwortlich | Status |
|---|----------------|----------------|--------|
| 1 | Welches Format und welche Felder soll die API-Schnittstelle liefern? | Lara (PO) / Entwicklungsteam | Offen |
| 2 | Wie wird die Baseline für „ungeklärte Vertretungsfälle" erhoben? | Klaus (Controller) | Offen |
| 3 | Welche abnehmenden Systeme sollen die API konsumieren und welche Daten benötigen sie konkret? | Lara (PO) | Offen |
| 4 | Wie werden bestehende Organisationsdaten (Altbestand) in das neue System migriert? | HR / Entwicklungsteam | Offen |

---

## 9. Nächste Schritte

Diese Requirements sind bereit für:
1. Review durch Stakeholder (Dirk, Lara)
2. Aufwandsschätzung durch das Entwicklungsteam
3. Priorisierung im Product Backlog
4. Weiterführung mit `requirements-engineer-data-structure` (Datenmodell)

---

*Dokumentiert mit dem requirements-engineer-cj-epic-story Agent am 2026-04-27*
