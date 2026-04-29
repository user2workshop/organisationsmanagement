package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.Stelle;
import de.conciso.orgmgmt.domain.StelleStatus;
import de.conciso.orgmgmt.repository.StelleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StelleService {

    private final StelleRepository repository;

    public StelleService(StelleRepository repository) {
        this.repository = repository;
    }

    public List<Stelle> findAll() { return repository.findAll(); }
    public List<Stelle> findByOrganisationseinheitId(String oeId) { return repository.findByOrganisationseinheitId(oeId); }

    public Stelle findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Stelle nicht gefunden: " + id));
    }

    public Stelle create(Stelle stelle) { return repository.save(stelle); }

    public Stelle update(String id, Stelle updated) {
        Stelle existing = findById(id);
        existing.setBezeichnung(updated.getBezeichnung());
        existing.setStellentyp(updated.getStellentyp());
        existing.setStatus(updated.getStatus());
        existing.setFunktionId(updated.getFunktionId());
        existing.setGueltigAb(updated.getGueltigAb());
        existing.setGueltigBis(updated.getGueltigBis());
        return repository.save(existing);
    }

    public Stelle aktivieren(String id) {
        Stelle stelle = findById(id);
        stelle.setStatus(StelleStatus.AKTIV);
        return repository.save(stelle);
    }
}
