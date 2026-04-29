package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Funktion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FunktionRepository extends MongoRepository<Funktion, String> {
    List<Funktion> findByIstLeitungsfunktion(boolean leitungsfunktion);
}
