package de.conciso.orgmgmt.repository;

import de.conciso.orgmgmt.domain.Organisationseinheit;
import de.conciso.orgmgmt.domain.OEStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrganisationseinheitRepository extends MongoRepository<Organisationseinheit, String> {
    List<Organisationseinheit> findByParentId(String parentId);
    List<Organisationseinheit> findByParentIdIsNull();
    List<Organisationseinheit> findByKostenstelleId(String kostenstelleId);
    List<Organisationseinheit> findByStatus(OEStatus status);
}
