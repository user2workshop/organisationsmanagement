package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Vertretungsregel;
import de.conciso.orgmgmt.domain.VertretungsregelStatus;
import de.conciso.orgmgmt.dto.VertretungsregelRequest;
import de.conciso.orgmgmt.service.VertretungsregelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vertretungsregeln")

@Tag(name = "Vertretungsregeln", description = "Vertretungsregelungen verwalten")
public class VertretungsregelController {

    private final VertretungsregelService service;

    public VertretungsregelController(VertretungsregelService service) {
        this.service = service;
    }


    @GetMapping
    @Operation(summary = "Alle Vertretungsregeln (optional nach Status filtern)")
    public List<Vertretungsregel> findAll(@RequestParam(required = false) VertretungsregelStatus status) {
        if (status != null) return service.findByStatus(status);
        return service.findAll();
    }

    @GetMapping("/aktiv")
    @Operation(summary = "Aktuell aktive Vertretungen")
    public List<Vertretungsregel> findAktiv() {
        return service.findAktiv();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Vertretungsregel nach ID")
    public Vertretungsregel findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Vertretungsregel anlegen")
    public Vertretungsregel create(@Valid @RequestBody VertretungsregelRequest request) {
        Vertretungsregel regel = new Vertretungsregel();
        regel.setStelleId(request.stelleId());
        regel.setVertretungspersonId(request.vertretungspersonId());
        regel.setStartDatum(request.startDatum());
        regel.setEndDatum(request.endDatum());
        regel.setGrund(request.grund());
        return service.create(regel);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Vertretungsregel stornieren")
    public Vertretungsregel stornieren(@PathVariable String id) {
        return service.stornieren(id);
    }
}
