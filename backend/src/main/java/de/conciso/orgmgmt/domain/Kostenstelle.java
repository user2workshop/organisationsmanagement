package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "kostenstellen")
public class Kostenstelle {

    @Id
    private String id;
    @Indexed(unique = true)
    private String nummer;
    private String bezeichnung;
    private LocalDate gueltigAb;
    private LocalDate gueltigBis;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNummer() { return nummer; }
    public void setNummer(String nummer) { this.nummer = nummer; }
    public String getBezeichnung() { return bezeichnung; }
    public void setBezeichnung(String bezeichnung) { this.bezeichnung = bezeichnung; }
    public LocalDate getGueltigAb() { return gueltigAb; }
    public void setGueltigAb(LocalDate gueltigAb) { this.gueltigAb = gueltigAb; }
    public LocalDate getGueltigBis() { return gueltigBis; }
    public void setGueltigBis(LocalDate gueltigBis) { this.gueltigBis = gueltigBis; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
