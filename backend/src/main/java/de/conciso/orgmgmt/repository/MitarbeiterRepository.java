package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Mitarbeiter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MitarbeiterRepository extends MongoRepository<Mitarbeiter, String> {
    Optional<Mitarbeiter> findByPersonalnummer(String personalnummer);
    Optional<Mitarbeiter> findByEmail(String email);
}
