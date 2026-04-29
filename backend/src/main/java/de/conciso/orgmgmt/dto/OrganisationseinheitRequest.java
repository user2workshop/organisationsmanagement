package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.OETyp;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record OrganisationseinheitRequest(
    @NotBlank String bezeichnung,
    @NotNull OETyp typ,
    String parentId,
    String kostenstelleId,
    @NotNull LocalDate gueltigAb,
    LocalDate gueltigBis
) {}
