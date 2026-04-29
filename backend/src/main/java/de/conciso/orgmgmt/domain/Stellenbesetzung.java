package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "stellenbesetzungen")
public class Stellenbesetzung {

    @Id
    private String id;
    private String stelleId;
    private String mitarbeiterId;
    private LocalDate startDatum;
    private LocalDate endDatum;
    private boolean istVerantwortlicher;
    private BesetzungsTyp typ;
    private StellenbesetzungStatus status = StellenbesetzungStatus.GEPLANT;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStelleId() { return stelleId; }
    public void setStelleId(String stelleId) { this.stelleId = stelleId; }
    public String getMitarbeiterId() { return mitarbeiterId; }
    public void setMitarbeiterId(String mitarbeiterId) { this.mitarbeiterId = mitarbeiterId; }
    public LocalDate getStartDatum() { return startDatum; }
    public void setStartDatum(LocalDate startDatum) { this.startDatum = startDatum; }
    public LocalDate getEndDatum() { return endDatum; }
    public void setEndDatum(LocalDate endDatum) { this.endDatum = endDatum; }
    public boolean isIstVerantwortlicher() { return istVerantwortlicher; }
    public void setIstVerantwortlicher(boolean istVerantwortlicher) { this.istVerantwortlicher = istVerantwortlicher; }
    public BesetzungsTyp getTyp() { return typ; }
    public void setTyp(BesetzungsTyp typ) { this.typ = typ; }
    public StellenbesetzungStatus getStatus() { return status; }
    public void setStatus(StellenbesetzungStatus status) { this.status = status; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
