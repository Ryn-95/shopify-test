# 🔍 Comment voir les paniers dans Shopify

## ⚠️ IMPORTANT : Différence entre Panier et Commande

- **Panier (Cart)** : Créé quand quelqu'un ajoute un produit → **NON visible dans "Commandes"**
- **Commande (Order)** : Créée après le checkout complété → **Visible dans "Commandes"**

## 📍 Où voir vos paniers dans Shopify

### Option 1 : Paniers Abandonnés (Abandoned Checkouts)

1. **Dans Shopify Admin** → **Commandes** (Orders)
2. **Cliquez sur "Panier abandonné"** ou **"Abandoned Checkouts"** dans le menu
3. **Vous verrez** :
   - Tous les paniers créés mais non complétés
   - Les produits ajoutés dans chaque panier
   - Les emails des clients (si disponibles)

**URL directe** : `https://admin.shopify.com/store/jjfyne-1b/orders/abandoned_checkouts`

### Option 2 : Analytics - Métriques de Panier

1. **Analyses** → **Tableau de bord**
2. **Cherchez la section "Panier"** ou **"Cart"**
3. **Vous verrez** :
   - Nombre de paniers créés
   - Taux d'abandon de panier
   - Valeur moyenne des paniers

### Option 3 : Compléter le Checkout pour voir une Commande

Pour voir une commande dans "Commandes" :

1. **Sur votre site** (`http://localhost:3000`)
2. **Ajoutez des produits au panier**
3. **Cliquez sur "Panier"** puis **"Passer à la caisse"**
4. **Complétez le checkout** (même en mode test)
5. **Retournez dans Shopify** → **Commandes**
6. **La commande apparaîtra !**

## 🧪 Test Rapide

1. Allez sur votre site : `http://localhost:3000`
2. Ajoutez un produit au panier
3. Cliquez sur "Panier"
4. Cliquez sur "Passer à la caisse"
5. Complétez le checkout (utilisez le mode test Shopify)
6. Retournez dans Shopify → Commandes
7. Vous verrez la commande !

## 💡 Pourquoi vous ne voyez rien ?

Les paniers créés via l'API Storefront sont **invisibles** dans "Commandes" tant que :
- ❌ Le checkout n'est pas complété
- ❌ Le paiement n'est pas traité

C'est normal ! Shopify ne compte que les **commandes complétées**, pas les paniers.

## ✅ Solution : Voir les Paniers Abandonnés

Pour voir vos 3 produits ajoutés au panier :

1. **Shopify Admin** → **Commandes**
2. **Cliquez sur "Panier abandonné"** (en haut ou dans le menu)
3. **Vous verrez tous les paniers créés !**

