package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Funktion;
import de.conciso.orgmgmt.dto.FunktionRequest;
import de.conciso.orgmgmt.service.FunktionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funktionen")

@Tag(name = "Funktionen", description = "Funktionen (Stammdaten) verwalten")
public class FunktionController {

    private final FunktionService service;

    public FunktionController(FunktionService service) {
        this.service = service;
    }


    @GetMapping
    @Operation(summary = "Alle Funktionen")
    public List<Funktion> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Funktion nach ID")
    public Funktion findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Funktion anlegen")
    public Funktion create(@Valid @RequestBody FunktionRequest request) {
        Funktion f = new Funktion();
        f.setBezeichnung(request.bezeichnung());
        f.setIstLeitungsfunktion(request.istLeitungsfunktion());
        return service.create(f);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Funktion aktualisieren")
    public Funktion update(@PathVariable String id, @Valid @RequestBody FunktionRequest request) {
        Funktion f = new Funktion();
        f.setBezeichnung(request.bezeichnung());
        f.setIstLeitungsfunktion(request.istLeitungsfunktion());
        return service.update(id, f);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Funktion löschen")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
