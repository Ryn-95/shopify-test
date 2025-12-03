# 🚀 Guide Rapide : Voir les paniers dans Shopify

## ⚡ Configuration en 5 minutes

### Étape 1 : Créer l'App Admin (2 min)

1. **Shopify Admin** → **Paramètres** → **Applications** → **Développer des applications**
2. **Créer une application** → Nom : "Admin API"
3. **Configurer les scopes** :
   - ✅ `write_draft_orders`
   - ✅ `read_draft_orders`
4. **Installer l'application**
5. **Copier le Admin API token** (dans "API credentials")

### Étape 2 : Ajouter le token (1 min)

Ouvrez `.env.local` et ajoutez :
```env
SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-token-ici
SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
```

### Étape 3 : Redémarrer (1 min)

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

### Étape 4 : Tester (1 min)

1. Ajoutez un produit au panier sur votre site
2. **Shopify Admin** → **Commandes** → **Brouillons**
3. ✅ Vous verrez la Draft Order !

## 📍 Où voir les paniers

- **Shopify Admin** → **Commandes** → **Brouillons** ← **ICI !**
- Chaque panier créé = 1 Draft Order visible

## 🎯 Résultat

✅ Les paniers sont maintenant visibles dans Shopify !
✅ Vous pouvez voir combien de personnes ajoutent des produits
✅ Toutes les statistiques sont dans Shopify Admin

