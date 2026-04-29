package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.BesetzungsTyp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record StellenbesetzungRequest(
    @NotBlank String stelleId,
    @NotBlank String mitarbeiterId,
    @NotNull LocalDate startDatum,
    LocalDate endDatum,
    boolean istVerantwortlicher,
    @NotNull BesetzungsTyp typ
) {}
