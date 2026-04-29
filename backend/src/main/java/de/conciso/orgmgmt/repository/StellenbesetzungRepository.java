package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Stellenbesetzung;
import de.conciso.orgmgmt.domain.StellenbesetzungStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StellenbesetzungRepository extends MongoRepository<Stellenbesetzung, String> {
    List<Stellenbesetzung> findByStelleId(String stelleId);
    List<Stellenbesetzung> findByMitarbeiterId(String mitarbeiterId);
    List<Stellenbesetzung> findByStelleIdAndStatus(String stelleId, StellenbesetzungStatus status);
    List<Stellenbesetzung> findByStelleIdAndIstVerantwortlicherAndStatus(
        String stelleId, boolean istVerantwortlicher, StellenbesetzungStatus status);
    List<Stellenbesetzung> findByStatus(StellenbesetzungStatus status);
}
