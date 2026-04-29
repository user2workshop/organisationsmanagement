package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.Vertretungsregel;
import de.conciso.orgmgmt.domain.VertretungsregelStatus;
import de.conciso.orgmgmt.repository.VertretungsregelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class VertretungsregelService {

    private static final Logger log = LoggerFactory.getLogger(VertretungsregelService.class);

    private final VertretungsregelRepository repository;

    public VertretungsregelService(VertretungsregelRepository repository) {
        this.repository = repository;
    }

    public List<Vertretungsregel> findAll() { return repository.findAll(); }
    public List<Vertretungsregel> findByStatus(VertretungsregelStatus status) { return repository.findByStatus(status); }
    public List<Vertretungsregel> findAktiv() { return repository.findByStatus(VertretungsregelStatus.AKTIV); }

    public Vertretungsregel findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Vertretungsregel nicht gefunden: " + id));
    }

    public Vertretungsregel create(Vertretungsregel regel) {
        LocalDate heute = LocalDate.now();
        regel.setStatus(!regel.getStartDatum().isAfter(heute)
            ? VertretungsregelStatus.AKTIV
            : VertretungsregelStatus.GEPLANT);
        return repository.save(regel);
    }

    public Vertretungsregel stornieren(String id) {
        Vertretungsregel regel = findById(id);
        if (regel.getStatus() == VertretungsregelStatus.BEENDET) {
            throw new IllegalStateException("Beendete Vertretungsregeln können nicht storniert werden.");
        }
        regel.setStatus(VertretungsregelStatus.STORNIERT);
        return repository.save(regel);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void aktualisiereStatus() {
        LocalDate heute = LocalDate.now();
        repository.findByStatus(VertretungsregelStatus.GEPLANT).stream()
            .filter(r -> !r.getStartDatum().isAfter(heute))
            .forEach(r -> { r.setStatus(VertretungsregelStatus.AKTIV); repository.save(r); log.info("Vertretungsregel {} aktiviert", r.getId()); });
        repository.findByStatus(VertretungsregelStatus.AKTIV).stream()
            .filter(r -> r.getEndDatum() != null && r.getEndDatum().isBefore(heute))
            .forEach(r -> { r.setStatus(VertretungsregelStatus.BEENDET); repository.save(r); log.info("Vertretungsregel {} beendet", r.getId()); });
    }
}
