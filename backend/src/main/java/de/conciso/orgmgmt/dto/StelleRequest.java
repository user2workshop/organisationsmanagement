package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.Stellentyp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record StelleRequest(
    @NotBlank String bezeichnung,
    @NotNull Stellentyp stellentyp,
    @NotBlank String organisationseinheitId,
    @NotBlank String funktionId,
    @NotNull LocalDate gueltigAb,
    LocalDate gueltigBis
) {}
