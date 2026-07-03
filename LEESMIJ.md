# OBIE Foto-Hoefbalans Meettool — PWA-pakket

Dit pakket maakt van de meettool een installeerbare app (Progressive Web App) voor Android en iOS.

## Inhoud van het pakket

```
index.html          → de tool zelf (voorheen OBIE_FotoHoefbalans_Meettool.html)
manifest.json       → app-definitie (naam, icoon, kleuren)
sw.js               → service worker (offline gebruik + installeerbaarheid)
icons/              → app-iconen in de vereiste maten
```

Alle paden zijn **relatief**, dus het pakket werkt ongeacht waar je het host: een submap, de hoofdmap van een domein, of GitHub Pages. Houd de bestanden bij elkaar in dezelfde map.

## Hosten (verplicht voor "installeren als app")

Een PWA moet via een **https-webadres** geladen worden voordat Android/iOS "Toevoegen aan startscherm / Installeren" aanbiedt. Vanaf een los bestand (file://) werkt dat niet.

Upload de volledige mapinhoud (index.html, manifest.json, sw.js en de map icons/) naar een https-locatie naar keuze. De drie bestanden en de icons-map moeten in dezelfde map staan.

**Camera-functie (v1.6):** de tool kan de foto rechtstreeks met de telefooncamera maken, met een waterpas-hulp die de sluiter pas vrijgeeft als de telefoon vlak staat (±4°). Dit vereist eveneens https én dat de gebruiker cameratoegang toestaat. Op iOS wordt bij het eerste gebruik ook toestemming voor de bewegingssensor (kanteling) gevraagd. Zonder sensor blijft de tool werken, maar valt de kantelcontrole terug op handmatige bevestiging in de checklist.

## Installeren op de telefoon

Zodra de tool via het https-adres geopend is:

**Android (Chrome):** menu (⋮) → "App installeren" of "Toevoegen aan startscherm".

**iOS (Safari):** deelknop → "Zet op beginscherm".

De app verschijnt dan met eigen icoon, opent schermvullend zonder browserbalk, en blijft werken zonder internet zodra hij één keer geladen is.

## Bijwerken naar een nieuwe versie

Bij een nieuwe versie van de tool:

1. Vervang `index.html` (en eventueel gewijzigde bestanden) op de host.
2. Verhoog in `sw.js` de regel `CACHE_VERSION` (bijv. van `obie-hoefbalans-v1-5` naar `...-v1-6`). Dit dwingt telefoons de nieuwe versie op te halen in plaats van de oude uit de cache te tonen.

Het zichtbare versienummer rechtsboven in de tool (en in het PDF-rapport) laat altijd zien welke versie actief is — handig om te controleren of iedereen de nieuwste heeft.

---
OCP Buitenzorg — intern gebruik, niet voor cliëntcommunicatie.
