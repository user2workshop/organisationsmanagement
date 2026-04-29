package de.conciso.orgmgmt.service;

import de.conciso.orgmgmt.domain.*;
import de.conciso.orgmgmt.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VerantwortlicherService {

    private final StellenbesetzungRepository besetzungRepository;
    private final VertretungsregelRepository vertretungsRepository;
    private final MitarbeiterRepository mitarbeiterRepository;

    public VerantwortlicherService(StellenbesetzungRepository besetzungRepository,
                                    VertretungsregelRepository vertretungsRepository,
                                    MitarbeiterRepository mitarbeiterRepository) {
        this.besetzungRepository = besetzungRepository;
        this.vertretungsRepository = vertretungsRepository;
        this.mitarbeiterRepository = mitarbeiterRepository;
    }

    public record VerantwortlicherResult(Mitarbeiter mitarbeiter, boolean istVertretung, String grund) {}

    public Optional<VerantwortlicherResult> findAktuellerVerantwortlicher(String stelleId) {
        LocalDate heute = LocalDate.now();

        List<Vertretungsregel> aktiveVertretungen = vertretungsRepository
            .findByStelleIdAndStatus(stelleId, VertretungsregelStatus.AKTIV)
            .stream()
            .filter(v -> !v.getStartDatum().isAfter(heute) &&
                         (v.getEndDatum() == null || !v.getEndDatum().isBefore(heute)))
            .toList();

        if (!aktiveVertretungen.isEmpty()) {
            Vertretungsregel vertretung = aktiveVertretungen.getFirst();
            return mitarbeiterRepository.findById(vertretung.getVertretungspersonId())
                .map(m -> new VerantwortlicherResult(m, true, vertretung.getGrund().name()));
        }

        List<Stellenbesetzung> aktiveBesetzungen = besetzungRepository
            .findByStelleIdAndIstVerantwortlicherAndStatus(stelleId, true, StellenbesetzungStatus.AKTIV)
            .stream()
            .filter(b -> !b.getStartDatum().isAfter(heute) &&
                         (b.getEndDatum() == null || !b.getEndDatum().isBefore(heute)))
            .toList();

        if (!aktiveBesetzungen.isEmpty()) {
            Stellenbesetzung besetzung = aktiveBesetzungen.getFirst();
            return mitarbeiterRepository.findById(besetzung.getMitarbeiterId())
                .map(m -> new VerantwortlicherResult(m, false, null));
        }

        return Optional.empty();
    }

    public List<String> findUnbesetzteLeitungsstellenIds(List<String> leitungsstellenIds) {
        return leitungsstellenIds.stream()
            .filter(id -> findAktuellerVerantwortlicher(id).isEmpty())
            .toList();
    }
}
