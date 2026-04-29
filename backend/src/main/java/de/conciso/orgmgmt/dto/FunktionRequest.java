package de.conciso.orgmgmt.dto;

import jakarta.validation.constraints.NotBlank;

public record FunktionRequest(
    @NotBlank String bezeichnung,
    boolean istLeitungsfunktion
) {}
