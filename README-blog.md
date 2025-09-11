# Blog System - Guide d'utilisation

## Installation

1. Installez les dépendances :
```bash
npm install
```

## Utilisation

### Créer un nouvel article

```bash
npm run new-post
```

Cette commande lance un assistant interactif qui vous demande :
- Titre de l'article
- Description/résumé  
- Catégorie
- Tags (séparés par virgules)

Un fichier Markdown est alors créé dans `blog/posts/` avec :
- Front matter pré-rempli
- Structure d'article de base
- Nom de fichier automatique : `YYYY-MM-DD-slug.md`

### Construire le blog

```bash
npm run build-blog
```

Cette commande :
- Lit tous les fichiers `.md` dans `blog/posts/`
- Les convertit en HTML avec le template
- Génère la page d'index du blog
- Crée les fichiers dans le dossier `blog/`

### Structure d'un article Markdown

```markdown
---
title: "Mon titre d'article"
description: "Résumé de l'article"
date: 2025-01-15
category: ".NET"
tags: ["C#", "Blazor", "Performance"]
keywords: "mots-clés pour SEO"
author: "Nadège Rouelle"
---

# Mon titre d'article

Contenu de l'article en Markdown...

## Section

Vous pouvez utiliser :
- Listes
- **Gras** et *italique*
- [Liens](url)

### Code

\`\`\`csharp
public class Example 
{
    public string Property { get; set; }
}
\`\`\`
```

## Fonctionnalités

### ✅ Incluses
- Conversion Markdown vers HTML
- Templates responsive avec Tailwind CSS
- Highlighting syntaxique (Prism.js)
- Navigation entre articles
- Index automatique avec tri par date
- Breadcrumbs et navigation cohérente
- SEO optimisé (meta tags automatiques)
- Calcul du temps de lecture
- Tags et catégories

### 🚀 Template features
- Design cohérent avec le site principal
- Navigation intégrée
- Google Analytics
- Responsive design
- Accessibilité

## Structure des fichiers

```
blog/
├── posts/           # Articles Markdown (.md)
├── templates/       # Templates HTML
├── index.html       # Page d'accueil du blog (générée)
└── article.html     # Articles individuels (générés)

build-blog.js        # Script de construction
new-post.js          # Assistant création d'articles
package.json         # Dépendances Node.js
```

## Workflow recommandé

1. **Créer un article** : `npm run new-post`
2. **Rédiger** dans le fichier généré en Markdown
3. **Construire** : `npm run build-blog` 
4. **Tester** : Ouvrir `blog/index.html` dans le navigateur
5. **Déployer** : Commit + push vers GitHub Pages

## Personnalisation

### Modifier le template
Éditez `blog/templates/article.html` pour changer :
- Le design
- Les métadonnées
- La structure

### Ajouter des fonctionnalités
Dans `build-blog.js`, vous pouvez :
- Modifier le parsing Markdown
- Ajouter des transformations
- Personnaliser la génération HTML

### CSS personnalisé
Le template utilise Tailwind CSS via CDN. Pour du CSS custom :
1. Créez un fichier CSS dans `blog/`
2. Ajoutez le lien dans le template

## Exemples de contenu

Un article exemple a été créé : `2025-01-15-blazor-server-vs-webassembly.md`

Lancez `npm run build-blog` puis ouvrez `blog/index.html` pour voir le résultat !

## Intégration avec le site principal

Le blog s'intègre parfaitement avec votre site :
- Navigation cohérente
- Design identique (Tailwind CSS)
- SEO optimisé
- Analytics intégrés

Pour ajouter le lien blog dans la navigation principale, ajoutez dans chaque page :
```html
<a href="./blog/index.html" class="text-gray-700 hover:text-blue-600">Blog</a>
```