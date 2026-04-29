package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.Mitarbeiter;
import de.conciso.orgmgmt.repository.MitarbeiterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MitarbeiterService {

    private final MitarbeiterRepository repository;

    public MitarbeiterService(MitarbeiterRepository repository) {
        this.repository = repository;
    }

    public List<Mitarbeiter> findAll() { return repository.findAll(); }

    public Mitarbeiter findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Mitarbeiter nicht gefunden: " + id));
    }

    public Mitarbeiter create(Mitarbeiter mitarbeiter) { return repository.save(mitarbeiter); }

    public Mitarbeiter update(String id, Mitarbeiter updated) {
        Mitarbeiter existing = findById(id);
        existing.setVorname(updated.getVorname());
        existing.setNachname(updated.getNachname());
        existing.setEmail(updated.getEmail());
        existing.setPersonalnummer(updated.getPersonalnummer());
        existing.setEintrittsdatum(updated.getEintrittsdatum());
        existing.setAustrittsdatum(updated.getAustrittsdatum());
        return repository.save(existing);
    }

    public void delete(String id) { repository.deleteById(id); }
}
