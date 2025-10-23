# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hybrid website for Rouelle Consulting, a .NET development freelance business. The site combines:
- **Static HTML pages** for the main professional site (built with pure HTML and Tailwind CSS)
- **Jekyll blog** for technical articles and posts

## Architecture

- **Static HTML website**: Pure HTML, CSS, and minimal JavaScript for main site pages
- **Jekyll blog**: Static site generator for blog posts at `/blog/`
- **Styling**:
  - Main site: Tailwind CSS via CDN (version 2.2.19)
  - Blog: Custom CSS (blog-style.css)
- **Analytics**: Google Analytics (gtag.js) integrated across all pages
- **SEO**: Structured data (JSON-LD) with organization and service markup
- **Deployment**: Automated via GitHub Actions workflow to GitHub Pages with Jekyll build

## File Structure

### Root Level
- `_config.yml` - Jekyll configuration (at root)
- `_layouts/` - Jekyll layout templates
- `_posts/` - Blog posts in Markdown format
- `blog/` - Blog index page
- `blog-style.css` - Blog-specific styles
- `Gemfile` - Ruby dependencies for Jekyll

### Static Site Pages
- `index.html` - Main landing page
- `services.html` - Services overview
- `services-entreprises.html` - Enterprise services
- `renfort-technique.html` - Technical reinforcement services
- `realisations.html` - Portfolio/case studies
- `cas-*.html` - Detailed case studies
- `service-*.html` - Individual service pages
- `apropos.html` - About page
- `contact.html` - Contact information
- `mentions-legales.html` - Legal notices

### Assets
- `images/` - Static assets (SVG icons, portraits)
- `CNAME` - Custom domain configuration

## Development Commands

### For Static Pages
Simply edit HTML files directly. For local development:
- Use a simple HTTP server like `python -m http.server` or VS Code Live Server

### For Jekyll Blog
```bash
# Install dependencies
bundle install

# Run Jekyll locally
bundle exec jekyll serve

# View at http://localhost:4000
```

### Creating Blog Posts
Create new posts in `_posts/` with filename format: `YYYY-MM-DD-title.md`

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/jekyll.yml`):
- Triggers on push to main branch
- Builds Jekyll site (includes static pages and blog)
- Deploys to GitHub Pages
- Static HTML pages are preserved as-is by Jekyll configuration

## Content Guidelines

- All pages use French language (`lang="fr"`)
- Consistent navigation structure across pages
- Google Analytics tracking on all pages
- SEO meta tags and structured data for business information
- Responsive design with Tailwind CSS classes