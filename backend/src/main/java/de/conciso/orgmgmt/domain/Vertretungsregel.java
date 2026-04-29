package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "vertretungsregeln")
public class Vertretungsregel {

    @Id
    private String id;
    private String stelleId;
    private String vertretungspersonId;
    private LocalDate startDatum;
    private LocalDate endDatum;
    private Vertretungsgrund grund;
    private VertretungsregelStatus status = VertretungsregelStatus.GEPLANT;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStelleId() { return stelleId; }
    public void setStelleId(String stelleId) { this.stelleId = stelleId; }
    public String getVertretungspersonId() { return vertretungspersonId; }
    public void setVertretungspersonId(String vertretungspersonId) { this.vertretungspersonId = vertretungspersonId; }
    public LocalDate getStartDatum() { return startDatum; }
    public void setStartDatum(LocalDate startDatum) { this.startDatum = startDatum; }
    public LocalDate getEndDatum() { return endDatum; }
    public void setEndDatum(LocalDate endDatum) { this.endDatum = endDatum; }
    public Vertretungsgrund getGrund() { return grund; }
    public void setGrund(Vertretungsgrund grund) { this.grund = grund; }
    public VertretungsregelStatus getStatus() { return status; }
    public void setStatus(VertretungsregelStatus status) { this.status = status; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
