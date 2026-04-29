package de.conciso.orgmgmt.dto;

import de.conciso.orgmgmt.domain.OEStatus;
import de.conciso.orgmgmt.domain.OETyp;
import de.conciso.orgmgmt.domain.Organisationseinheit;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record OrganisationseinheitResponse(
    String id,
    String bezeichnung,
    OETyp typ,
    OEStatus status,
    String parentId,
    String kostenstelleId,
    LocalDate gueltigAb,
    LocalDate gueltigBis,
    LocalDateTime erstelltAm,
    LocalDateTime geaendertAm,
    List<OrganisationseinheitResponse> kinder
) {
    public static OrganisationseinheitResponse from(Organisationseinheit oe) {
        return from(oe, List.of());
    }

    public static OrganisationseinheitResponse from(Organisationseinheit oe, List<OrganisationseinheitResponse> kinder) {
        return new OrganisationseinheitResponse(
            oe.getId(), oe.getBezeichnung(), oe.getTyp(), oe.getStatus(),
            oe.getParentId(), oe.getKostenstelleId(),
            oe.getGueltigAb(), oe.getGueltigBis(),
            oe.getErstelltAm(), oe.getGeaendertAm(), kinder
        );
    }
}
