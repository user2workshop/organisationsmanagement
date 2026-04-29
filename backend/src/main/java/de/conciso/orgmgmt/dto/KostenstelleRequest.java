package de.conciso.orgmgmt.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record KostenstelleRequest(
    @NotBlank String nummer,
    @NotBlank String bezeichnung,
    @NotNull LocalDate gueltigAb,
    LocalDate gueltigBis
) {}
