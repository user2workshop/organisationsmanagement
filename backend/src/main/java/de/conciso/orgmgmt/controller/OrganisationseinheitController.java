package de.conciso.orgmgmt.controller;

import de.conciso.orgmgmt.domain.Organisationseinheit;
import de.conciso.orgmgmt.dto.OrganisationseinheitRequest;
import de.conciso.orgmgmt.dto.OrganisationseinheitResponse;
import de.conciso.orgmgmt.dto.VerantwortlicherResponse;
import de.conciso.orgmgmt.service.OrganisationseinheitService;
import de.conciso.orgmgmt.service.StelleService;
import de.conciso.orgmgmt.service.VerantwortlicherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organisationseinheiten")

@Tag(name = "Organisationseinheiten", description = "Organisationsstruktur verwalten")
public class OrganisationseinheitController {

    private final OrganisationseinheitService service;
    private final StelleService stelleService;
    private final VerantwortlicherService verantwortlicherService;

    public OrganisationseinheitController(OrganisationseinheitService service, StelleService stelleService, VerantwortlicherService verantwortlicherService) {
        this.service = service;
        this.stelleService = stelleService;
        this.verantwortlicherService = verantwortlicherService;
    }


    @GetMapping
    @Operation(summary = "Organisationsbaum abrufen (rekursiv)")
    public List<OrganisationseinheitResponse> findAll() {
        List<Organisationseinheit> roots = service.findRoots();
        return roots.stream().map(this::buildTree).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Organisationseinheit nach ID")
    public OrganisationseinheitResponse findById(@PathVariable String id) {
        return buildTree(service.findById(id));
    }

    @GetMapping("/{id}/verantwortlicher")
    @Operation(summary = "Aktuellen Verantwortlichen der Leitungsstelle ermitteln")
    public VerantwortlicherResponse findVerantwortlicher(@PathVariable String id) {
        // Finde die erste Leitungsstelle der OE
        return stelleService.findByOrganisationseinheitId(id).stream()
            .flatMap(stelle -> {
                Optional<VerantwortlicherService.VerantwortlicherResult> result =
                    verantwortlicherService.findAktuellerVerantwortlicher(stelle.getId());
                return result.stream().map(r -> new VerantwortlicherResponse(
                    r.mitarbeiter().getId(),
                    r.mitarbeiter().getVorname(),
                    r.mitarbeiter().getNachname(),
                    r.mitarbeiter().getEmail(),
                    r.istVertretung(),
                    r.grund()
                ));
            })
            .findFirst()
            .orElse(null);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Organisationseinheit anlegen")
    public OrganisationseinheitResponse create(@Valid @RequestBody OrganisationseinheitRequest request) {
        Organisationseinheit oe = new Organisationseinheit();
        oe.setBezeichnung(request.bezeichnung());
        oe.setTyp(request.typ());
        oe.setParentId(request.parentId());
        oe.setKostenstelleId(request.kostenstelleId());
        oe.setGueltigAb(request.gueltigAb());
        oe.setGueltigBis(request.gueltigBis());
        return OrganisationseinheitResponse.from(service.create(oe));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Organisationseinheit aktualisieren")
    public OrganisationseinheitResponse update(@PathVariable String id,
                                               @Valid @RequestBody OrganisationseinheitRequest request) {
        Organisationseinheit oe = new Organisationseinheit();
        oe.setBezeichnung(request.bezeichnung());
        oe.setTyp(request.typ());
        oe.setParentId(request.parentId());
        oe.setKostenstelleId(request.kostenstelleId());
        oe.setGueltigAb(request.gueltigAb());
        oe.setGueltigBis(request.gueltigBis());
        return OrganisationseinheitResponse.from(service.update(id, oe));
    }

    @PostMapping("/{id}/aktivieren")
    @Operation(summary = "Organisationseinheit aktivieren (ENTWURF → AKTIV)")
    public OrganisationseinheitResponse aktivieren(@PathVariable String id) {
        return OrganisationseinheitResponse.from(service.aktivieren(id));
    }

    @PostMapping("/{id}/deaktivieren")
    @Operation(summary = "Organisationseinheit deaktivieren (AKTIV → INAKTIV)")
    public OrganisationseinheitResponse deaktivieren(@PathVariable String id) {
        return OrganisationseinheitResponse.from(service.deaktivieren(id));
    }

    @PostMapping("/{id}/aufloesen")
    @Operation(summary = "Organisationseinheit auflösen (→ AUFGELOEST)")
    public OrganisationseinheitResponse aufloesen(@PathVariable String id) {
        return OrganisationseinheitResponse.from(service.aufloesen(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Organisationseinheit löschen (nur Status ENTWURF)")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    private OrganisationseinheitResponse buildTree(Organisationseinheit oe) {
        List<OrganisationseinheitResponse> kinder = service.findChildren(oe.getId())
            .stream().map(this::buildTree).toList();
        return OrganisationseinheitResponse.from(oe, kinder);
    }
}
