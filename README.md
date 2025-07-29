# Website der Bürgerinitiative Zukunft Bernöwe

Die offizielle Website der Bürgerinitiative Zukunft Bernöwe (BI.ZB) - einer engagierten Gruppe von Dorfbewohnern, die sich für die Zukunft von Bernöwe einsetzen.

## Über das Projekt

Diese Website dient als zentrale Informationsplattform für:
- Aktuelle Veranstaltungen und Termine (Sommerfest, Glühweinfest, Dorfputz, etc.)
- Erfolge und Projekte der Bürgerinitiative
- Neuigkeiten aus dem Dorfleben
- Informationen über die Initiative und ihre Ziele

## Technologie

Das Projekt basiert auf [Eleventy (11ty)](https://www.11ty.dev/), einem statischen Site-Generator, der Markdown-Dateien in HTML konvertiert und eine moderne Website erstellt.

### Struktur
- `src/` - Quelldateien
  - `blog/` - Blog-Artikel als Markdown-Dateien
  - `assets/` - Bilder und andere Medien
  - `_includes/` - Nunjucks-Templates
  - `*.njk` - Seiten-Templates
- `public/` - Generierte statische Website

## Lokale Entwicklung

### Voraussetzungen
- Node.js (Version 14 oder höher)
- npm

### Installation und Start

1. Repository klonen:
```bash
git clone https://github.com/bernoewe/bernoewe.github.io.git
cd bernoewe.github.io
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm start
```

Die Website ist dann unter `http://localhost:8080` erreichbar und wird bei Änderungen automatisch neu geladen.

### Build für Produktion

```bash
npm run build
```

Dies generiert die statische Website im `public/` Ordner.

## Content Management

### Neuen Blog-Artikel erstellen

1. Neue Markdown-Datei in `src/blog/` erstellen mit dem Format `YYYY-MM-DD-titel.md`
2. Frontmatter-Header hinzufügen:
```yaml
---
title: Titel des Artikels
description: Kurze Beschreibung
author: BI.ZB
date: 2025-01-15T12:00:00.000Z
tags: featured
image: /assets/bild_thumb.png
imageAlt: Alt-Text für das Bild
---
```
3. Markdown-Content hinzufügen

### Bilder hinzufügen

1. Vollbild in `src/assets/` ablegen
2. Thumbnail erstellen (empfohlen: 369x522px für Hauptbilder):
```bash
magick bild.jpg -resize "369x522^" -gravity center -extent 369x522 bild_thumb.png
```

## Deployment

Die Website wird automatisch über GitHub Pages bereitgestellt. Bei Push auf den `main`-Branch wird die Website automatisch neu generiert und veröffentlicht.

## Lizenz

ISC License