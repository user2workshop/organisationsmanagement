package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.Mitarbeiter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record MitarbeiterResponse(
    String id,
    String vorname,
    String nachname,
    String email,
    String personalnummer,
    LocalDate eintrittsdatum,
    LocalDate austrittsdatum,
    boolean aktiv,
    LocalDateTime erstelltAm,
    LocalDateTime geaendertAm
) {
    public static MitarbeiterResponse from(Mitarbeiter m) {
        return new MitarbeiterResponse(
            m.getId(), m.getVorname(), m.getNachname(), m.getEmail(),
            m.getPersonalnummer(), m.getEintrittsdatum(), m.getAustrittsdatum(),
            m.isAktiv(), m.getErstelltAm(), m.getGeaendertAm()
        );
    }
}
