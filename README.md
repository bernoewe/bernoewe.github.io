# Bürgerinitiative Zukunft Bernöwe Website

The official website of Bürgerinitiative Zukunft Bernöwe (BI.ZB) - a dedicated group of village residents committed to the future of Bernöwe.

## About the Project

This website serves as a central information platform for:
- Current events and appointments (Summer Festival, Mulled Wine Festival, Village Cleanup, etc.)
- Achievements and projects of the citizens' initiative
- News from village life
- Information about the initiative and its goals

The website is designed as a single-page application where all main content (appointments, achievements) is accessible via anchor navigation on the homepage.

## Technology

The project is based on [Eleventy (11ty)](https://www.11ty.dev/), a static site generator that converts Markdown files to HTML and creates a modern website.

### Structure
- `src/` - Source files
  - `blog/` - Blog articles as Markdown files
  - `assets/` - Images and other media
  - `_includes/` - Nunjucks templates
  - `*.njk` - Page templates
- `public/` - Generated static website

## Local Development

### Prerequisites
- Node.js (Version 14 or higher)
- npm

### Installation and Start

1. Clone repository:
```bash
git clone https://github.com/bernoewe/bernoewe.github.io.git
cd bernoewe.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The website will then be available at `http://localhost:8080` and will automatically reload when changes are made.

### Production Build

```bash
npm run build
```

This generates the static website in the `public/` folder.

## Content Management

### Creating a New Blog Article

1. Create a new Markdown file in `src/blog/` with the format `YYYY-MM-DD-title.md`
2. Add frontmatter header:
```yaml
---
title: Article Title
description: Short description
author: BI.ZB
date: 2025-01-15T12:00:00.000Z
tags: featured
image: /assets/image_thumb.png
imageAlt: Alt text for the image
---
```
3. Add Markdown content

### Adding Images

1. Place full image in `src/assets/`
2. Create thumbnail (recommended: 369x522px for main images):
```bash
magick image.jpg -resize "369x522^" -gravity center -extent 369x522 image_thumb.png
```

## Deployment

The website is automatically deployed via GitHub Pages. When pushing to the `main` branch, the website is automatically regenerated and published.

## Lizenz

ISC License