package de.conciso.orgmgmt.dto;

public record VerantwortlicherResponse(
    String mitarbeiterId,
    String vorname,
    String nachname,
    String email,
    boolean istVertretung,
    String vertretungsgrund
) {}
