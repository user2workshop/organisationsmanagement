package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.Funktion;
import de.conciso.orgmgmt.repository.FunktionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FunktionService {

    private final FunktionRepository repository;

    public FunktionService(FunktionRepository repository) {
        this.repository = repository;
    }

    public List<Funktion> findAll() { return repository.findAll(); }

    public Funktion findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Funktion nicht gefunden: " + id));
    }

    public Funktion create(Funktion funktion) { return repository.save(funktion); }

    public Funktion update(String id, Funktion updated) {
        Funktion existing = findById(id);
        existing.setBezeichnung(updated.getBezeichnung());
        existing.setIstLeitungsfunktion(updated.isIstLeitungsfunktion());
        return repository.save(existing);
    }

    public void delete(String id) { repository.deleteById(id); }
}
