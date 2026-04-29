package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Stelle;
import de.conciso.orgmgmt.domain.StelleStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StelleRepository extends MongoRepository<Stelle, String> {
    List<Stelle> findByOrganisationseinheitId(String organisationseinheitId);
    List<Stelle> findByFunktionId(String funktionId);
    List<Stelle> findByStatus(StelleStatus status);
}
