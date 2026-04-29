package de.conciso.orgmgmt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record MitarbeiterRequest(
    @NotBlank String vorname,
    @NotBlank String nachname,
    @NotBlank @Email String email,
    @NotBlank String personalnummer,
    @NotNull LocalDate eintrittsdatum,
    LocalDate austrittsdatum
) {}
