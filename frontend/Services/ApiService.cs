using OrgMgmtFrontend.Models;
using System.Net.Http.Json;
using System.Text.Json;

namespace OrgMgmtFrontend.Services;

public class ApiService(HttpClient http)
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true
    };

    // Organisationseinheiten
    public async Task<List<Organisationseinheit>> GetOrganisationseinheitenAsync() =>
        await http.GetFromJsonAsync<List<Organisationseinheit>>("organisationseinheiten", JsonOptions) ?? [];

    public async Task CreateOrganisationseinheitAsync(object data)
    {
        var r = await http.PostAsJsonAsync("organisationseinheiten", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public async Task UpdateOrganisationseinheitAsync(string id, object data)
    {
        var r = await http.PutAsJsonAsync($"organisationseinheiten/{id}", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public Task AktivierenOeAsync(string id) =>
        http.PostAsync($"organisationseinheiten/{id}/aktivieren", null);

    public Task DeaktivierenOeAsync(string id) =>
        http.PostAsync($"organisationseinheiten/{id}/deaktivieren", null);

    public Task AufloesenOeAsync(string id) =>
        http.PostAsync($"organisationseinheiten/{id}/aufloesen", null);

    public Task DeleteOeAsync(string id) =>
        http.DeleteAsync($"organisationseinheiten/{id}");

    // Kostenstellen
    public async Task<List<Kostenstelle>> GetKostenstellenAsync() =>
        await http.GetFromJsonAsync<List<Kostenstelle>>("kostenstellen", JsonOptions) ?? [];

    public async Task CreateKostenstelleAsync(object data)
    {
        var r = await http.PostAsJsonAsync("kostenstellen", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public async Task<UeberschneidungResult?> PruefeUeberschneidungAsync(string id) =>
        await http.GetFromJsonAsync<UeberschneidungResult>($"kostenstellen/{id}/ueberschneidung", JsonOptions);

    // Mitarbeiter
    public async Task<List<Mitarbeiter>> GetMitarbeiterAsync() =>
        await http.GetFromJsonAsync<List<Mitarbeiter>>("mitarbeiter", JsonOptions) ?? [];

    public async Task CreateMitarbeiterAsync(object data)
    {
        var r = await http.PostAsJsonAsync("mitarbeiter", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public async Task UpdateMitarbeiterAsync(string id, object data)
    {
        var r = await http.PutAsJsonAsync($"mitarbeiter/{id}", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    // Stellen
    public async Task<List<Stelle>> GetStellenAsync() =>
        await http.GetFromJsonAsync<List<Stelle>>("stellen", JsonOptions) ?? [];

    public async Task CreateStelleAsync(object data)
    {
        var r = await http.PostAsJsonAsync("stellen", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public async Task UpdateStelleAsync(string id, object data)
    {
        var r = await http.PutAsJsonAsync($"stellen/{id}", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public Task AktiviereStelleAsync(string id) =>
        http.PostAsync($"stellen/{id}/aktivieren", null);

    // Funktionen
    public async Task<List<Funktion>> GetFunktionenAsync() =>
        await http.GetFromJsonAsync<List<Funktion>>("funktionen", JsonOptions) ?? [];

    // Stellenbesetzungen
    public async Task<List<Stellenbesetzung>> GetBesetzungenByMitarbeiterAsync(string id) =>
        await http.GetFromJsonAsync<List<Stellenbesetzung>>($"mitarbeiter/{id}/besetzungen", JsonOptions) ?? [];

    public async Task CreateStellenbesetzungAsync(object data)
    {
        var r = await http.PostAsJsonAsync("stellenbesetzungen", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public Task BeendeStellenbesetzungAsync(string id, string endDatum) =>
        http.PostAsync($"stellenbesetzungen/{id}/beenden?endDatum={endDatum}", null);

    // Vertretungsregeln
    public async Task<List<Vertretungsregel>> GetVertretungsregelnAsync(string? status = null)
    {
        var url = "vertretungsregeln" + (status != null ? $"?status={status}" : "");
        return await http.GetFromJsonAsync<List<Vertretungsregel>>(url, JsonOptions) ?? [];
    }

    public async Task CreateVertretungsregelAsync(object data)
    {
        var r = await http.PostAsJsonAsync("vertretungsregeln", data, JsonOptions);
        r.EnsureSuccessStatusCode();
    }

    public Task DeleteVertretungsregelAsync(string id) =>
        http.DeleteAsync($"vertretungsregeln/{id}");

    // Warnungen
    public async Task<List<Warnung>> GetUnbesetzteLeitungsfunktionenAsync() =>
        await http.GetFromJsonAsync<List<Warnung>>("warnungen/unbesetzte-leitungsfunktionen", JsonOptions) ?? [];
}
