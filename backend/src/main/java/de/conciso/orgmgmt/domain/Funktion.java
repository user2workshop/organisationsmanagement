package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "funktionen")
public class Funktion {

    @Id
    private String id;
    private String bezeichnung;
    private boolean istLeitungsfunktion;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBezeichnung() { return bezeichnung; }
    public void setBezeichnung(String bezeichnung) { this.bezeichnung = bezeichnung; }
    public boolean isIstLeitungsfunktion() { return istLeitungsfunktion; }
    public void setIstLeitungsfunktion(boolean istLeitungsfunktion) { this.istLeitungsfunktion = istLeitungsfunktion; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }
}
