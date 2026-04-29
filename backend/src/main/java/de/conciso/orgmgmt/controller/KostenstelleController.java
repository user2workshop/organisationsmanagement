package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Kostenstelle;
import de.conciso.orgmgmt.dto.KostenstelleRequest;
import de.conciso.orgmgmt.service.KostenstelleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kostenstellen")

@Tag(name = "Kostenstellen", description = "Kostenstellen verwalten")
public class KostenstelleController {

    private final KostenstelleService service;

    public KostenstelleController(KostenstelleService service) {
        this.service = service;
    }


    @GetMapping
    @Operation(summary = "Alle Kostenstellen")
    public List<Kostenstelle> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Kostenstelle nach ID")
    public Kostenstelle findById(@PathVariable String id) {
        return service.findById(id);
    }

    @GetMapping("/{id}/ueberschneidung")
    @Operation(summary = "Prüft ob Kostenstelle mehreren OEs zugeordnet ist")
    public Map<String, Boolean> pruefeUeberschneidung(@PathVariable String id) {
        return Map.of("hatUeberschneidung", service.hatUeberschneidung(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Kostenstelle anlegen")
    public Kostenstelle create(@Valid @RequestBody KostenstelleRequest request) {
        Kostenstelle k = new Kostenstelle();
        k.setNummer(request.nummer());
        k.setBezeichnung(request.bezeichnung());
        k.setGueltigAb(request.gueltigAb());
        k.setGueltigBis(request.gueltigBis());
        return service.create(k);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Kostenstelle aktualisieren")
    public Kostenstelle update(@PathVariable String id, @Valid @RequestBody KostenstelleRequest request) {
        Kostenstelle k = new Kostenstelle();
        k.setNummer(request.nummer());
        k.setBezeichnung(request.bezeichnung());
        k.setGueltigAb(request.gueltigAb());
        k.setGueltigBis(request.gueltigBis());
        return service.update(id, k);
    }
}
