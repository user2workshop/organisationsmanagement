package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Vertretungsregel;
import de.conciso.orgmgmt.domain.VertretungsregelStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VertretungsregelRepository extends MongoRepository<Vertretungsregel, String> {
    List<Vertretungsregel> findByStelleId(String stelleId);
    List<Vertretungsregel> findByVertretungspersonId(String vertretungspersonId);
    List<Vertretungsregel> findByStatus(VertretungsregelStatus status);
    List<Vertretungsregel> findByStelleIdAndStatus(String stelleId, VertretungsregelStatus status);
}
