# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Rouelle Consulting, a .NET development freelance business. The site is built with pure HTML and Tailwind CSS, deployed to GitHub Pages.

## Architecture

- **Static HTML website**: No build process required - pure HTML, CSS, and minimal JavaScript
- **Styling**: Uses Tailwind CSS via CDN (version 2.2.19)
- **Analytics**: Google Analytics (gtag.js) integrated across all pages
- **SEO**: Structured data (JSON-LD) with organization and service markup
- **Deployment**: Automated via GitHub Actions workflow to GitHub Pages

## File Structure

- `index.html` - Main landing page
- `services.html` - Services overview
- `services-entreprises.html` - Enterprise services
- `renfort-technique.html` - Technical reinforcement services
- `realisations.html` - Portfolio/case studies
- `cas-*.html` - Detailed case studies (API insurance, e-health, logistics)
- `apropos.html` - About page
- `contact.html` - Contact information
- `mentions-legales.html` - Legal notices
- `images/` - Static assets (SVG icons, portraits)
- `CNAME` - Custom domain configuration

## Development Commands

Since this is a static site, there are no build commands. Simply edit HTML files directly.

For local development:
- Open HTML files directly in browser
- Use a simple HTTP server like `python -m http.server` or VS Code Live Server extension

## Deployment

Deployment is automatic via GitHub Actions (`.github/workflows/static.yml`):
- Triggers on push to main branch
- Deploys entire repository to GitHub Pages
- No build step required

## Content Guidelines

- All pages use French language (`lang="fr"`)
- Consistent navigation structure across pages
- Google Analytics tracking on all pages
- SEO meta tags and structured data for business information
- Responsive design with Tailwind CSS classes