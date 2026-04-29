package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.Kostenstelle;
import de.conciso.orgmgmt.repository.KostenstelleRepository;
import de.conciso.orgmgmt.repository.OrganisationseinheitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class KostenstelleService {

    private final KostenstelleRepository repository;
    private final OrganisationseinheitRepository oeRepository;

    public KostenstelleService(KostenstelleRepository repository, OrganisationseinheitRepository oeRepository) {
        this.repository = repository;
        this.oeRepository = oeRepository;
    }

    public List<Kostenstelle> findAll() { return repository.findAll(); }

    public Kostenstelle findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Kostenstelle nicht gefunden: " + id));
    }

    public Kostenstelle create(Kostenstelle kostenstelle) { return repository.save(kostenstelle); }

    public Kostenstelle update(String id, Kostenstelle updated) {
        Kostenstelle existing = findById(id);
        existing.setNummer(updated.getNummer());
        existing.setBezeichnung(updated.getBezeichnung());
        existing.setGueltigAb(updated.getGueltigAb());
        existing.setGueltigBis(updated.getGueltigBis());
        return repository.save(existing);
    }

    public boolean hatUeberschneidung(String kostenstelleId) {
        return oeRepository.findByKostenstelleId(kostenstelleId).size() > 1;
    }
}
