# 🔧 Configuration API Admin Shopify pour voir les paniers

## ⚠️ Différence importante

- **API Storefront** : Pour les clients (ajout au panier, checkout) → **NON visible dans Shopify Admin**
- **API Admin** : Pour vous (gestion, statistiques) → **Visible dans Shopify Admin**

## 📋 Étapes pour voir les paniers dans Shopify

### Option 1 : Utiliser les Draft Orders (Commandes Brouillons)

Les "Draft Orders" sont visibles dans Shopify → Commandes → Brouillons.

### Option 2 : Utiliser l'API Admin pour créer des commandes brouillons

Quand un client ajoute un produit au panier, créer automatiquement une "Draft Order" dans Shopify.

## 🔑 Configuration requise

### 1. Créer une App Admin dans Shopify

1. **Allez sur** : `https://admin.shopify.com/store/jjfyne-1b/settings/apps`
2. **Cliquez sur** "Développer des applications"
3. **Créez une nouvelle application**
4. **Activez les permissions** :
   - `write_draft_orders` (Créer des commandes brouillons)
   - `read_orders` (Lire les commandes)
5. **Installez l'application**
6. **Copiez le Admin API access token**

### 2. Ajouter les variables d'environnement

Ajoutez dans `.env.local` :
```env
SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-admin-token
SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
```

## 📊 Où voir les informations dans Shopify

Une fois configuré, vous verrez :

- **Commandes → Brouillons** : Tous les paniers créés
- **Commandes → Commandes** : Les commandes complétées
- **Analyses** : Statistiques détaillées

## ⚠️ Note importante

L'API Admin nécessite :
- Des credentials différents de l'API Storefront
- Des permissions spécifiques
- Une configuration supplémentaire

Voulez-vous que je configure cela pour vous ?

