# Installation et développement local

## Prérequis pour le développement local du blog

Pour développer le blog Jekyll localement, vous devez installer Ruby.

### Installation sur Windows

1. **Télécharger RubyInstaller**
   - Aller sur https://rubyinstaller.org/downloads/
   - Télécharger **Ruby+Devkit 3.2.X (x64)** - VERSION WITH DEVKIT OBLIGATOIRE

2. **Installer Ruby**
   - Exécuter l'installateur
   - ✅ Cocher "Add Ruby executables to your PATH"
   - À la fin, laisser coché "Run 'ridk install'"

3. **Configuration MSYS2** (fenêtre qui s'ouvre automatiquement)
   - Taper `3` puis Entrée
   - Attendre la fin de l'installation

4. **Fermer et rouvrir le terminal**

5. **Vérifier l'installation**
   ```bash
   ruby --version
   gem --version
   ```

6. **Installer Bundler**
   ```bash
   gem install bundler
   ```

7. **Installer les dépendances du projet**
   ```bash
   cd c:\Users\nadeg\Desktop\sitepro
   bundle install
   ```

8. **Lancer le serveur Jekyll**
   ```bash
   bundle exec jekyll serve
   ```

9. **Ouvrir le navigateur**
   - Aller sur http://localhost:4000

## Alternative : Développement sans installation locale

Si vous ne souhaitez pas installer Ruby :
1. Éditez vos fichiers HTML/Markdown
2. Committez et poussez sur GitHub
3. GitHub Actions construira et déploiera automatiquement le site

## Commandes utiles

```bash
# Installer les dépendances
bundle install

# Lancer le serveur de développement
bundle exec jekyll serve

# Construire le site (génère _site/)
bundle exec jekyll build

# Lancer avec rechargement automatique
bundle exec jekyll serve --livereload
```

## Créer un nouvel article de blog

1. Créer un fichier dans `_posts/` avec le format : `YYYY-MM-DD-titre.md`
2. Ajouter le front matter :
   ```yaml
   ---
   layout: post
   title: "Titre de l'article"
   date: YYYY-MM-DD HH:MM:SS +0200
   author: Nadège Rouelle
   ---
   ```
3. Écrire le contenu en Markdown
4. Tester localement avec `bundle exec jekyll serve`
5. Committer et pousser sur GitHub
