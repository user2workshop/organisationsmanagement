package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.Vertretungsgrund;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record VertretungsregelRequest(
    @NotBlank String stelleId,
    @NotBlank String vertretungspersonId,
    @NotNull LocalDate startDatum,
    @NotNull LocalDate endDatum,
    @NotNull Vertretungsgrund grund
) {}
