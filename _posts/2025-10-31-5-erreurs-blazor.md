---
title: 5 erreurs courantes avec Blazor
author: Nadege Rouelle
date: 2025-10-31
---
# Les 5 erreurs les plus courantes avec Blazor (et comment les éviter)

Blazor est une technologie fantastique qui permet de construire des applications web modernes avec C# et .NET, sans dépendre du JavaScript pour tout.  
Mais derrière sa simplicité apparente se cachent quelques pièges que rencontrent même les développeurs expérimentés.

Dans cet article, on explore **5 erreurs classiques** avec Blazor — et comment les éviter avec des exemples concrets 👇

---

## ⚙️ 1. Négliger le cycle de vie des composants

Chaque composant Blazor suit un **cycle de vie précis**. Mal comprendre les méthodes comme `OnInitializedAsync`, `OnParametersSetAsync` ou `OnAfterRenderAsync` peut causer des appels redondants, des erreurs ou des fuites mémoire.

### ❌ Exemple d’erreur :
```razor
@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        // Mauvais : cet appel est exécuté à chaque rendu
        await LoadDataAsync();
    }

    private async Task LoadDataAsync()
    {
        // Simule un appel API
        await Task.Delay(500);
        Console.WriteLine("Data loaded");
    }
}
```

### ✅ Bonne pratique :
```razor
@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await LoadDataAsync();
        }
    }
}
```

💡 Utilise le paramètre `firstRender` pour t’assurer que ton code ne s’exécute qu’une seule fois après le premier rendu.

---

## 🧠 2. Mauvaise gestion de l’état (State Management)

Blazor **ne gère pas automatiquement l’état global** de ton application. Si tu relies directement les composants entre eux, tu te retrouves vite avec un spaghetti de dépendances.

### ❌ Exemple :
```razor
<!-- Counter.razor -->
<h3>Compteur : @count</h3>
<button @onclick="Increment">+</button>

@code {
    private int count;
    private void Increment() => count++;
}
```

### ✅ Bonne pratique : utiliser un service singleton
```csharp
// CounterService.cs
public class CounterService
{
    public int Count { get; private set; }
    public event Action OnChange;

    public void Increment()
    {
        Count++;
        OnChange?.Invoke();
    }
}
```

```razor
<!-- Counter.razor -->
@inject CounterService CounterService

<h3>Compteur : @CounterService.Count</h3>
<button @onclick="Increment">+</button>

@code {
    protected override void OnInitialized()
    {
        CounterService.OnChange += StateHasChanged;
    }

    private void Increment() => CounterService.Increment();
}
```

💡 Enregistrer le service dans `Program.cs` :
```csharp
builder.Services.AddSingleton<CounterService>();
```

---

## 🧩 3. Trop de logique métier dans le code-behind

Mélanger la logique métier avec le code UI rend les composants difficiles à maintenir.

### ❌ Exemple :
```razor
@code {
    private List<Product> products = new();
    private async Task LoadProducts()
    {
        var response = await http.GetFromJsonAsync<List<Product>>("api/products");
        products = response.Where(p => p.Stock > 0).ToList(); // logique métier ici
    }
}
```

### ✅ Bonne pratique : séparer la logique dans un service
```csharp
// ProductService.cs
public class ProductService
{
    private readonly HttpClient http;

    public ProductService(HttpClient http) => this.http = http;

    public async Task<List<Product>> GetAvailableProductsAsync()
    {
        var products = await http.GetFromJsonAsync<List<Product>>("api/products");
        return products.Where(p => p.Stock > 0).ToList();
    }
}
```

```razor
@inject ProductService ProductService

@code {
    private List<Product> products = new();

    protected override async Task OnInitializedAsync()
    {
        products = await ProductService.GetAvailableProductsAsync();
    }
}
```

💡 Résultat : ton composant devient plus lisible, testable et réutilisable.

---

## 🚀 4. Mauvaise gestion des performances

Blazor peut vite devenir lent si les composants se re-rendent trop souvent.

### ❌ Exemple :
```razor
@foreach (var item in items)
{
    <ItemComponent Item="item" />
}
```

### ✅ Bonne pratique :
```razor
@foreach (var item in items)
{
    <ItemComponent @key="item.Id" Item="item" />
}
```

💡 Le paramètre `@key` permet à Blazor d’optimiser le rendu en associant chaque élément à une clé unique.

---

## 🌐 5. Ignorer la différence entre Blazor Server et Blazor WebAssembly

Beaucoup de développeurs se lancent sans comprendre la différence entre ces deux modèles — pourtant, le choix impacte **la performance, la sécurité et l’architecture**.

| Caractéristique | Blazor Server | Blazor WebAssembly |
|-----------------|----------------|---------------------|
| Exécution | Sur le serveur (SignalR) | Dans le navigateur |
| Performance initiale | Rapide | Plus lente (téléchargement du runtime) |
| Accès aux ressources | Serveur .NET | Client uniquement |
| Mise à jour | Instantanée | Requiert rebuild/déploiement |
| Idéal pour | Intranet, apps connectées | PWA, apps offline |

💡 **Astuce** :  
- Choisis **Blazor Server** si tu veux un rendu immédiat et que la latence n’est pas un problème.  
- Choisis **Blazor WebAssembly** pour une application plus autonome et réactive côté client.

---

## 🎯 Conclusion

Blazor simplifie énormément le développement web avec .NET, mais demande un minimum de rigueur technique.  
En résumé :

✅ Comprends le cycle de vie des composants  
✅ Gère proprement ton état  
✅ Sépare la logique métier de l’UI  
✅ Optimise le rendu  
✅ Choisis le bon modèle d’hébergement  