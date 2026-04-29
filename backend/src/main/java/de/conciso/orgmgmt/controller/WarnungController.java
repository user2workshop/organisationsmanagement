package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Funktion;
import de.conciso.orgmgmt.domain.Stelle;
import de.conciso.orgmgmt.service.FunktionService;
import de.conciso.orgmgmt.service.StelleService;
import de.conciso.orgmgmt.service.VerantwortlicherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/warnungen")

@Tag(name = "Warnungen", description = "Systemwarnungen abrufen")
public class WarnungController {

    private final StelleService stelleService;
    private final FunktionService funktionService;
    private final VerantwortlicherService verantwortlicherService;

    public WarnungController(StelleService stelleService, FunktionService funktionService, VerantwortlicherService verantwortlicherService) {
        this.stelleService = stelleService;
        this.funktionService = funktionService;
        this.verantwortlicherService = verantwortlicherService;
    }


    @GetMapping("/unbesetzte-leitungsfunktionen")
    @Operation(summary = "Leitungsstellen ohne aktuellen Verantwortlichen")
    public List<Map<String, String>> findUnbesetzteLeitungsfunktionen() {
        List<String> leitungsstellenIds = stelleService.findAll().stream()
            .filter(s -> {
                try {
                    Funktion f = funktionService.findById(s.getFunktionId());
                    return f.isIstLeitungsfunktion();
                } catch (Exception e) {
                    return false;
                }
            })
            .map(Stelle::getId)
            .toList();

        return verantwortlicherService.findUnbesetzteLeitungsstellenIds(leitungsstellenIds).stream()
            .map(id -> {
                Stelle s = stelleService.findById(id);
                return Map.of("stelleId", id, "bezeichnung", s.getBezeichnung());
            })
            .toList();
    }
}
