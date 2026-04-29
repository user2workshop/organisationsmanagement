package de.conciso.orgmgmt.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "mitarbeiter")
public class Mitarbeiter {

    @Id
    private String id;
    private String vorname;
    private String nachname;
    @Indexed(unique = true)
    private String email;
    @Indexed(unique = true)
    private String personalnummer;
    private LocalDate eintrittsdatum;
    private LocalDate austrittsdatum;
    @CreatedDate
    private LocalDateTime erstelltAm;
    @LastModifiedDate
    private LocalDateTime geaendertAm;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getVorname() { return vorname; }
    public void setVorname(String vorname) { this.vorname = vorname; }
    public String getNachname() { return nachname; }
    public void setNachname(String nachname) { this.nachname = nachname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPersonalnummer() { return personalnummer; }
    public void setPersonalnummer(String personalnummer) { this.personalnummer = personalnummer; }
    public LocalDate getEintrittsdatum() { return eintrittsdatum; }
    public void setEintrittsdatum(LocalDate eintrittsdatum) { this.eintrittsdatum = eintrittsdatum; }
    public LocalDate getAustrittsdatum() { return austrittsdatum; }
    public void setAustrittsdatum(LocalDate austrittsdatum) { this.austrittsdatum = austrittsdatum; }
    public LocalDateTime getErstelltAm() { return erstelltAm; }
    public void setErstelltAm(LocalDateTime erstelltAm) { this.erstelltAm = erstelltAm; }
    public LocalDateTime getGeaendertAm() { return geaendertAm; }
    public void setGeaendertAm(LocalDateTime geaendertAm) { this.geaendertAm = geaendertAm; }

    public boolean isAktiv() {
        return austrittsdatum == null || austrittsdatum.isAfter(LocalDate.now());
    }
}
