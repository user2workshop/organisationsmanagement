package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "organisationseinheiten")
public class Organisationseinheit {

    @Id
    private String id;
    private String bezeichnung;
    private OETyp typ;
    private OEStatus status = OEStatus.ENTWURF;
    private String parentId;
    private String kostenstelleId;
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
    public OETyp getTyp() { return typ; }
    public void setTyp(OETyp typ) { this.typ = typ; }
    public OEStatus getStatus() { return status; }
    public void setStatus(OEStatus status) { this.status = status; }
    public String getParentId() { return parentId; }
    public void setParentId(String parentId) { this.parentId = parentId; }
    public String getKostenstelleId() { return kostenstelleId; }
    public void setKostenstelleId(String kostenstelleId) { this.kostenstelleId = kostenstelleId; }
    public LocalDate getGueltigAb() { return gueltigAb; }
    public void setGueltigAb(LocalDate gueltigAb) { this.gueltigAb = gueltigAb; }
    public LocalDate getGueltigBis() { return gueltigBis; }
    public void setGueltigBis(LocalDate gueltigBis) { this.gueltigBis = gueltigBis; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
