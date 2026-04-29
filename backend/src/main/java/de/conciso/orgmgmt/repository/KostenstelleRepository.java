package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Kostenstelle;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface KostenstelleRepository extends MongoRepository<Kostenstelle, String> {
    Optional<Kostenstelle> findByNummer(String nummer);
}
