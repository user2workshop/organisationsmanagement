package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "stellen")
public class Stelle {

    @Id
    private String id;
    private String bezeichnung;
    private Stellentyp stellentyp;
    private StelleStatus status = StelleStatus.ENTWURF;
    private String organisationseinheitId;
    private String funktionId;
    private LocalDate gueltigAb;
    private LocalDate gueltigBis;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBezeichnung() { return bezeichnung; }
    public void setBezeichnung(String bezeichnung) { this.bezeichnung = bezeichnung; }
    public Stellentyp getStellentyp() { return stellentyp; }
    public void setStellentyp(Stellentyp stellentyp) { this.stellentyp = stellentyp; }
    public StelleStatus getStatus() { return status; }
    public void setStatus(StelleStatus status) { this.status = status; }
    public String getOrganisationseinheitId() { return organisationseinheitId; }
    public void setOrganisationseinheitId(String organisationseinheitId) { this.organisationseinheitId = organisationseinheitId; }
    public String getFunktionId() { return funktionId; }
    public void setFunktionId(String funktionId) { this.funktionId = funktionId; }
    public LocalDate getGueltigAb() { return gueltigAb; }
    public void setGueltigAb(LocalDate gueltigAb) { this.gueltigAb = gueltigAb; }
    public LocalDate getGueltigBis() { return gueltigBis; }
    public void setGueltigBis(LocalDate gueltigBis) { this.gueltigBis = gueltigBis; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
