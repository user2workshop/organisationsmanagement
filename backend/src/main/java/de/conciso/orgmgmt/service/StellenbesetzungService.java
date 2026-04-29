package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.*;
import de.conciso.orgmgmt.repository.FunktionRepository;
import de.conciso.orgmgmt.repository.StelleRepository;
import de.conciso.orgmgmt.repository.StellenbesetzungRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StellenbesetzungService {

    private static final Logger log = LoggerFactory.getLogger(StellenbesetzungService.class);

    private final StellenbesetzungRepository repository;
    private final StelleRepository stelleRepository;
    private final FunktionRepository funktionRepository;

    public StellenbesetzungService(StellenbesetzungRepository repository,
                                    StelleRepository stelleRepository,
                                    FunktionRepository funktionRepository) {
        this.repository = repository;
        this.stelleRepository = stelleRepository;
        this.funktionRepository = funktionRepository;
    }

    public List<Stellenbesetzung> findByStelleId(String stelleId) { return repository.findByStelleId(stelleId); }
    public List<Stellenbesetzung> findByMitarbeiterId(String mitarbeiterId) { return repository.findByMitarbeiterId(mitarbeiterId); }

    public Stellenbesetzung findById(String id) {
        return repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Stellenbesetzung nicht gefunden: " + id));
    }

    public Stellenbesetzung create(Stellenbesetzung besetzung) {
        validiereVerantwortlichenEindeutigkeit(besetzung);
        if (!besetzung.getStartDatum().isAfter(LocalDate.now())) {
            besetzung.setStatus(StellenbesetzungStatus.AKTIV);
        }
        return repository.save(besetzung);
    }

    public Stellenbesetzung beenden(String id, LocalDate endDatum) {
        Stellenbesetzung besetzung = findById(id);
        besetzung.setEndDatum(endDatum);
        besetzung.setStatus(StellenbesetzungStatus.BEENDET);
        return repository.save(besetzung);
    }

    private void validiereVerantwortlichenEindeutigkeit(Stellenbesetzung neu) {
        if (!neu.isIstVerantwortlicher()) return;
        Stelle stelle = stelleRepository.findById(neu.getStelleId())
            .orElseThrow(() -> new NoSuchElementException("Stelle nicht gefunden: " + neu.getStelleId()));
        Funktion funktion = funktionRepository.findById(stelle.getFunktionId())
            .orElseThrow(() -> new NoSuchElementException("Funktion nicht gefunden: " + stelle.getFunktionId()));
        if (!funktion.isIstLeitungsfunktion()) return;
        List<Stellenbesetzung> aktiveVerantwortliche = repository
            .findByStelleIdAndIstVerantwortlicherAndStatus(neu.getStelleId(), true, StellenbesetzungStatus.AKTIV);
        if (!aktiveVerantwortliche.isEmpty()) {
            throw new IllegalStateException("Für Leitungsstelle " + neu.getStelleId() + " ist bereits ein Verantwortlicher aktiv.");
        }
    }

    @Scheduled(cron = "0 0 * * * *")
    public void aktualisiereStatus() {
        LocalDate heute = LocalDate.now();
        repository.findByStatus(StellenbesetzungStatus.GEPLANT).stream()
            .filter(b -> !b.getStartDatum().isAfter(heute))
            .forEach(b -> { b.setStatus(StellenbesetzungStatus.AKTIV); repository.save(b); log.info("Stellenbesetzung {} aktiviert", b.getId()); });
        repository.findByStatus(StellenbesetzungStatus.AKTIV).stream()
            .filter(b -> b.getEndDatum() != null && b.getEndDatum().isBefore(heute))
            .forEach(b -> { b.setStatus(StellenbesetzungStatus.BEENDET); repository.save(b); log.info("Stellenbesetzung {} beendet", b.getId()); });
    }
}
