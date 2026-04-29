package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Stellenbesetzung;
import de.conciso.orgmgmt.dto.StellenbesetzungRequest;
import de.conciso.orgmgmt.service.StellenbesetzungService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController

@Tag(name = "Stellenbesetzungen", description = "Stellenbesetzungen verwalten")
public class StellenbesetzungController {

    private final StellenbesetzungService service;

    public StellenbesetzungController(StellenbesetzungService service) {
        this.service = service;
    }


    @GetMapping("/api/stellen/{stelleId}/besetzungen")
    @Operation(summary = "Besetzungen einer Stelle")
    public List<Stellenbesetzung> findByStelleId(@PathVariable String stelleId) {
        return service.findByStelleId(stelleId);
    }

    @GetMapping("/api/mitarbeiter/{mitarbeiterId}/besetzungen")
    @Operation(summary = "Besetzungen eines Mitarbeiters")
    public List<Stellenbesetzung> findByMitarbeiterId(@PathVariable String mitarbeiterId) {
        return service.findByMitarbeiterId(mitarbeiterId);
    }

    @PostMapping("/api/stellenbesetzungen")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Stellenbesetzung anlegen")
    public Stellenbesetzung create(@Valid @RequestBody StellenbesetzungRequest request) {
        Stellenbesetzung b = new Stellenbesetzung();
        b.setStelleId(request.stelleId());
        b.setMitarbeiterId(request.mitarbeiterId());
        b.setStartDatum(request.startDatum());
        b.setEndDatum(request.endDatum());
        b.setIstVerantwortlicher(request.istVerantwortlicher());
        b.setTyp(request.typ());
        return service.create(b);
    }

    @PostMapping("/api/stellenbesetzungen/{id}/beenden")
    @Operation(summary = "Stellenbesetzung beenden")
    public Stellenbesetzung beenden(@PathVariable String id,
                                    @RequestParam LocalDate endDatum) {
        return service.beenden(id, endDatum);
    }
}
