package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Mitarbeiter;
import de.conciso.orgmgmt.dto.MitarbeiterRequest;
import de.conciso.orgmgmt.dto.MitarbeiterResponse;
import de.conciso.orgmgmt.service.MitarbeiterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mitarbeiter")

@Tag(name = "Mitarbeiter", description = "Mitarbeiter-Stammdaten verwalten")
public class MitarbeiterController {

    private final MitarbeiterService service;

    public MitarbeiterController(MitarbeiterService service) {
        this.service = service;
    }


    @GetMapping
    @Operation(summary = "Alle Mitarbeiter abrufen")
    public List<MitarbeiterResponse> findAll() {
        return service.findAll().stream().map(MitarbeiterResponse::from).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Mitarbeiter nach ID")
    public MitarbeiterResponse findById(@PathVariable String id) {
        return MitarbeiterResponse.from(service.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Mitarbeiter anlegen")
    public MitarbeiterResponse create(@Valid @RequestBody MitarbeiterRequest request) {
        Mitarbeiter m = new Mitarbeiter();
        m.setVorname(request.vorname());
        m.setNachname(request.nachname());
        m.setEmail(request.email());
        m.setPersonalnummer(request.personalnummer());
        m.setEintrittsdatum(request.eintrittsdatum());
        m.setAustrittsdatum(request.austrittsdatum());
        return MitarbeiterResponse.from(service.create(m));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mitarbeiter aktualisieren")
    public MitarbeiterResponse update(@PathVariable String id, @Valid @RequestBody MitarbeiterRequest request) {
        Mitarbeiter m = new Mitarbeiter();
        m.setVorname(request.vorname());
        m.setNachname(request.nachname());
        m.setEmail(request.email());
        m.setPersonalnummer(request.personalnummer());
        m.setEintrittsdatum(request.eintrittsdatum());
        m.setAustrittsdatum(request.austrittsdatum());
        return MitarbeiterResponse.from(service.update(id, m));
    }
}
