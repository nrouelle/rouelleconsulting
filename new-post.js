const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function createNewPost() {
  try {
    console.log('🚀 Création d\'un nouvel article de blog\n');

    const title = await question('Titre de l\'article: ');
    const description = await question('Description (résumé): ');
    const category = await question('Catégorie (ex: .NET, Blazor, Architecture): ');
    const tags = await question('Tags (séparés par des virgules): ');
    
    const slug = generateSlug(title);
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${slug}.md`;
    
    const frontMatter = `---
title: "${title}"
description: "${description}"
date: ${date}
category: ${category}
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
keywords: "${category.toLowerCase()}, développement .NET, ${tags}"
author: "Nadège Rouelle"
---

# ${title}

${description}

## Introduction

Écrivez votre introduction ici...

## Développement

### Section 1

Votre contenu ici...

### Section 2

Vous pouvez ajouter du code :

\`\`\`csharp
public class Example 
{
    public string Property { get; set; }
}
\`\`\`

## Conclusion

Votre conclusion...

---

*Cet article vous a été utile ? N'hésitez pas à [me contacter](../contact.html) pour discuter de vos projets .NET !*
`;

    const postsDir = './blog/posts';
    await fs.ensureDir(postsDir);
    
    const filePath = path.join(postsDir, filename);
    await fs.writeFile(filePath, frontMatter);
    
    console.log(`\n✅ Nouvel article créé: ${filename}`);
    console.log(`📂 Emplacement: ${filePath}`);
    console.log(`\n📝 Étapes suivantes:`);
    console.log(`1. Ouvrez le fichier ${filename} et rédigez votre article`);
    console.log(`2. Lancez "npm run build-blog" pour générer le HTML`);
    console.log(`3. Testez en ouvrant blog/index.html dans votre navigateur`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'article:', error);
  } finally {
    rl.close();
  }
}

createNewPost();