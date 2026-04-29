package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Stelle;
import de.conciso.orgmgmt.dto.StelleRequest;
import de.conciso.orgmgmt.service.StelleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stellen")

@Tag(name = "Stellen", description = "Stellen verwalten")
public class StelleController {

    private final StelleService service;

    public StelleController(StelleService service) {
        this.service = service;
    }


    @GetMapping
    @Operation(summary = "Alle Stellen")
    public List<Stelle> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Stelle nach ID")
    public Stelle findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Stelle anlegen")
    public Stelle create(@Valid @RequestBody StelleRequest request) {
        Stelle s = new Stelle();
        s.setBezeichnung(request.bezeichnung());
        s.setStellentyp(request.stellentyp());
        s.setOrganisationseinheitId(request.organisationseinheitId());
        s.setFunktionId(request.funktionId());
        s.setGueltigAb(request.gueltigAb());
        s.setGueltigBis(request.gueltigBis());
        return service.create(s);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Stelle aktualisieren")
    public Stelle update(@PathVariable String id, @Valid @RequestBody StelleRequest request) {
        Stelle s = new Stelle();
        s.setBezeichnung(request.bezeichnung());
        s.setStellentyp(request.stellentyp());
        s.setFunktionId(request.funktionId());
        s.setGueltigAb(request.gueltigAb());
        s.setGueltigBis(request.gueltigBis());
        return service.update(id, s);
    }

    @PostMapping("/{id}/aktivieren")
    @Operation(summary = "Stelle aktivieren")
    public Stelle aktivieren(@PathVariable String id) {
        return service.aktivieren(id);
    }
}
