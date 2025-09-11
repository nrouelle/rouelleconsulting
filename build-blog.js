const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

// Configuration
const CONFIG = {
  postsDir: './blog/posts',
  outputDir: './blog',
  templateDir: './blog/templates',
  baseUrl: 'https://www.rouelleconsulting.fr/blog'
};

// Configuration Marked pour la syntaxe highlighting
marked.setOptions({
  highlight: function(code, lang) {
    return `<pre class="language-${lang}"><code class="language-${lang}">${code}</code></pre>`;
  },
  breaks: true,
  gfm: true
});

// Fonction pour calculer le temps de lecture estimé
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Fonction pour formater une date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Fonction pour générer le slug à partir du nom de fichier
function generateSlug(filename) {
  return filename.replace('.md', '').toLowerCase();
}

// Fonction pour remplacer les placeholders dans le template
function renderTemplate(template, data) {
  let html = template;
  
  // Remplacements simples
  Object.keys(data).forEach(key => {
    const placeholder = `{{${key}}}`;
    html = html.replace(new RegExp(placeholder, 'g'), data[key] || '');
  });
  
  // Gestion des tags (si présents)
  if (data.tags) {
    const tagsHtml = data.tags.map(tag => 
      `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">#${tag}</span>`
    ).join('');
    html = html.replace('{{#each tags}}', '').replace('{{/each}}', '');
    html = html.replace('<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">#{{this}}</span>', tagsHtml);
  }
  
  return html;
}

// Fonction principale pour construire le blog
async function buildBlog() {
  try {
    console.log('🚀 Construction du blog...');
    
    // Vérifier que les dossiers existent
    await fs.ensureDir(CONFIG.postsDir);
    await fs.ensureDir(CONFIG.outputDir);
    
    // Lire le template d'article
    const articleTemplate = await fs.readFile(path.join(CONFIG.templateDir, 'article.html'), 'utf-8');
    
    // Lire tous les fichiers markdown
    const postFiles = await fs.readdir(CONFIG.postsDir);
    const mdFiles = postFiles.filter(file => file.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      console.log('⚠️  Aucun fichier Markdown trouvé dans', CONFIG.postsDir);
      return;
    }
    
    const posts = [];
    
    // Traiter chaque fichier markdown
    for (const file of mdFiles) {
      const filePath = path.join(CONFIG.postsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Parser le front matter
      const parsed = fm(content);
      const metadata = parsed.attributes;
      const markdownContent = parsed.body;
      
      // Convertir le markdown en HTML
      const htmlContent = marked(markdownContent);
      
      // Générer les données pour le template
      const slug = generateSlug(file);
      const postData = {
        title: metadata.title || 'Article sans titre',
        description: metadata.description || '',
        date: formatDate(metadata.date),
        category: metadata.category || 'Développement',
        tags: metadata.tags || [],
        keywords: metadata.keywords || `développement .NET, ${metadata.category}`,
        readTime: calculateReadTime(markdownContent),
        content: htmlContent,
        slug: slug,
        url: `${slug}.html`
      };
      
      // Générer le HTML de l'article
      const articleHtml = renderTemplate(articleTemplate, postData);
      
      // Sauvegarder l'article
      await fs.writeFile(path.join(CONFIG.outputDir, `${slug}.html`), articleHtml);
      
      posts.push({
        ...postData,
        dateObj: new Date(metadata.date)
      });
      
      console.log(`✅ Article généré: ${slug}.html`);
    }
    
    // Trier les posts par date (plus récent en premier)
    posts.sort((a, b) => b.dateObj - a.dateObj);
    
    // Générer l'index du blog
    await generateBlogIndex(posts);
    
    console.log(`🎉 Blog construit avec succès! ${posts.length} articles générés.`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la construction du blog:', error);
  }
}

// Fonction pour générer la page d'index du blog
async function generateBlogIndex(posts) {
  const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7LYXXZY2WP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-7LYXXZY2WP');
    </script>
    <title>Blog - Développement .NET par Nadège Rouelle</title>
    <meta name="description" content="Articles techniques sur le développement .NET, Blazor, C#, architecture logicielle par une développeuse freelance expérimentée.">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-white text-gray-800 font-sans">

  <!-- Navigation -->
  <nav class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="text-xl font-bold text-blue-700">Rouelle Consulting</div>
      <div class="space-x-6 text-sm font-medium">
        <a href="../index.html" class="text-gray-700 hover:text-blue-600">Accueil</a>
        <a href="../services.html" class="text-gray-700 hover:text-blue-600">Services</a>
        <a href="../realisations.html" class="text-gray-700 hover:text-blue-600">Réalisations</a>
        <a href="../apropos.html" class="text-gray-700 hover:text-blue-600">À propos</a>
        <a href="../contact.html" class="text-gray-700 hover:text-blue-600">Contact</a>
        <a href="./index.html" class="text-blue-600 hover:text-blue-600">Blog</a>
      </div>
    </div>
  </nav>

  <!-- Breadcrumbs -->
  <nav class="bg-gray-50 px-6 py-3">
    <div class="max-w-6xl mx-auto">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li><a href="../index.html" class="hover:text-blue-600">Accueil</a></li>
        <li><span class="mx-2">/</span></li>
        <li><span class="text-gray-800 font-medium">Blog</span></li>
      </ol>
    </div>
  </nav>

  <!-- Header -->
  <header class="bg-gray-100 py-12 px-6 text-center">
    <h1 class="text-4xl font-bold mb-4">Blog Technique</h1>
    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
      Retours d'expérience, conseils et bonnes pratiques en développement .NET
    </p>
  </header>

  <!-- Articles -->
  <section class="max-w-4xl mx-auto py-12 px-6">
    ${posts.length === 0 ? 
      '<p class="text-center text-gray-600">Aucun article publié pour le moment.</p>' :
      posts.map(post => `
        <article class="mb-12 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
          <h2 class="text-2xl font-bold mb-2">
            <a href="${post.url}" class="text-blue-700 hover:text-blue-900">${post.title}</a>
          </h2>
          <div class="flex items-center text-gray-600 text-sm mb-4 space-x-4">
            <span>📅 ${post.date}</span>
            <span>🏷️ ${post.category}</span>
            <span>⏱️ ${post.readTime} min</span>
          </div>
          <p class="text-gray-700 mb-4">${post.description}</p>
          <div class="flex justify-between items-center">
            <a href="${post.url}" class="text-blue-600 hover:text-blue-800 font-semibold">
              Lire la suite →
            </a>
            <div class="flex gap-2">
              ${post.tags.slice(0, 3).map(tag => 
                `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">#${tag}</span>`
              ).join('')}
            </div>
          </div>
        </article>
      `).join('')
    }
  </section>

  <!-- Footer -->
  <footer class="text-center text-sm text-gray-500 py-6">
    © 2025 Nadège Rouelle – Développeuse .NET Freelance
  </footer>

</body>
</html>`;

  await fs.writeFile(path.join(CONFIG.outputDir, 'index.html'), indexHtml);
  console.log('✅ Index du blog généré');
}

// Exécuter si appelé directement
if (require.main === module) {
  buildBlog();
}

module.exports = { buildBlog };