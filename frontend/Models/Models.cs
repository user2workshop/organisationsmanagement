namespace OrgMgmtFrontend.Models;

public class Mitarbeiter
{
    public string Id { get; set; } = "";
    public string Vorname { get; set; } = "";
    public string Nachname { get; set; } = "";
    public string Email { get; set; } = "";
    public string Personalnummer { get; set; } = "";
    public string Eintrittsdatum { get; set; } = "";
    public string? Austrittsdatum { get; set; }
    public bool Aktiv { get; set; }
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Funktion
{
    public string Id { get; set; } = "";
    public string Bezeichnung { get; set; } = "";
    public bool IstLeitungsfunktion { get; set; }
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Kostenstelle
{
    public string Id { get; set; } = "";
    public string Nummer { get; set; } = "";
    public string Bezeichnung { get; set; } = "";
    public string GueltigAb { get; set; } = "";
    public string? GueltigBis { get; set; }
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Organisationseinheit
{
    public string Id { get; set; } = "";
    public string Bezeichnung { get; set; } = "";
    public string Typ { get; set; } = "";
    public string Status { get; set; } = "";
    public string? ParentId { get; set; }
    public string? KostenstelleId { get; set; }
    public string GueltigAb { get; set; } = "";
    public string? GueltigBis { get; set; }
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
    public List<Organisationseinheit> Kinder { get; set; } = new();
}

public class Stelle
{
    public string Id { get; set; } = "";
    public string Bezeichnung { get; set; } = "";
    public string Stellentyp { get; set; } = "";
    public string Status { get; set; } = "";
    public string OrganisationseinheitId { get; set; } = "";
    public string FunktionId { get; set; } = "";
    public string GueltigAb { get; set; } = "";
    public string? GueltigBis { get; set; }
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Stellenbesetzung
{
    public string Id { get; set; } = "";
    public string StelleId { get; set; } = "";
    public string MitarbeiterId { get; set; } = "";
    public string StartDatum { get; set; } = "";
    public string? EndDatum { get; set; }
    public bool IstVerantwortlicher { get; set; }
    public string Typ { get; set; } = "";
    public string Status { get; set; } = "";
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Vertretungsregel
{
    public string Id { get; set; } = "";
    public string StelleId { get; set; } = "";
    public string VertretungspersonId { get; set; } = "";
    public string StartDatum { get; set; } = "";
    public string EndDatum { get; set; } = "";
    public string Grund { get; set; } = "";
    public string Status { get; set; } = "";
    public string ErstelltAm { get; set; } = "";
    public string GeaendertAm { get; set; } = "";
}

public class Warnung
{
    public string StelleId { get; set; } = "";
    public string Bezeichnung { get; set; } = "";
}

public class UeberschneidungResult
{
    public bool HatUeberschneidung { get; set; }
}

public class OeFormData
{
    public string Bezeichnung { get; set; } = "";
    public string Typ { get; set; } = "ABTEILUNG";
    public string? ParentId { get; set; }
    public string? KostenstelleId { get; set; }
    public string GueltigAb { get; set; } = "";
    public string? GueltigBis { get; set; }
}
