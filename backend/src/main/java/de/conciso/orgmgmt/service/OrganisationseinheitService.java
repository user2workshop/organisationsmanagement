package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.OEStatus;
import de.conciso.orgmgmt.domain.Organisationseinheit;
import de.conciso.orgmgmt.repository.OrganisationseinheitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrganisationseinheitService {

    private final OrganisationseinheitRepository repository;

    public OrganisationseinheitService(OrganisationseinheitRepository repository) {
        this.repository = repository;
    }

    public List<Organisationseinheit> findAll() { return repository.findAll(); }
    public List<Organisationseinheit> findRoots() { return repository.findByParentIdIsNull(); }
    public List<Organisationseinheit> findChildren(String parentId) { return repository.findByParentId(parentId); }

    public Organisationseinheit findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Organisationseinheit nicht gefunden: " + id));
    }

    public Organisationseinheit create(Organisationseinheit oe) { return repository.save(oe); }

    public Organisationseinheit update(String id, Organisationseinheit updated) {
        Organisationseinheit existing = findById(id);
        existing.setBezeichnung(updated.getBezeichnung());
        existing.setTyp(updated.getTyp());
        existing.setStatus(updated.getStatus());
        existing.setParentId(updated.getParentId());
        existing.setKostenstelleId(updated.getKostenstelleId());
        existing.setGueltigAb(updated.getGueltigAb());
        existing.setGueltigBis(updated.getGueltigBis());
        return repository.save(existing);
    }

    public Organisationseinheit aktivieren(String id) {
        Organisationseinheit oe = findById(id);
        oe.setStatus(OEStatus.AKTIV);
        return repository.save(oe);
    }

    public Organisationseinheit deaktivieren(String id) {
        Organisationseinheit oe = findById(id);
        if (oe.getStatus() == OEStatus.AUFGELOEST) {
            throw new IllegalStateException("Aufgelöste Einheiten können nicht deaktiviert werden.");
        }
        oe.setStatus(OEStatus.INAKTIV);
        return repository.save(oe);
    }

    public Organisationseinheit aufloesen(String id) {
        Organisationseinheit oe = findById(id);
        oe.setStatus(OEStatus.AUFGELOEST);
        return repository.save(oe);
    }

    public void delete(String id) {
        Organisationseinheit oe = findById(id);
        if (oe.getStatus() != OEStatus.ENTWURF) {
            throw new IllegalStateException("Nur Einheiten im Status ENTWURF können gelöscht werden.");
        }
        repository.deleteById(id);
    }
}
