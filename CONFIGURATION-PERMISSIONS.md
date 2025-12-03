# 🔧 Configuration des Permissions Admin API

## 📍 Vous êtes sur la page "Configuration"

### Étape 1 : Configurer les scopes Admin API

1. **Sur la page "Configuration"**, cherchez la section **"Intégration Admin API"**
2. **Cliquez sur "Configurer les scopes Admin API"** (ou "Configure Admin API scopes")
3. **Une liste de permissions s'affichera**

### Étape 2 : Activer les permissions nécessaires

Dans la liste des permissions, cherchez et **activez** (cochez) :

✅ **`write_draft_orders`** 
   - Description : Créer et modifier des commandes brouillons
   - **C'EST LA PERMISSION LA PLUS IMPORTANTE !**

✅ **`read_draft_orders`**
   - Description : Lire les commandes brouillons
   - Utile pour voir les paniers créés

✅ **`read_orders`** (optionnel mais recommandé)
   - Description : Lire les commandes
   - Utile pour voir les statistiques

### Étape 3 : Enregistrer

1. **Après avoir coché les permissions**, cliquez sur **"Enregistrer"** (Save) en bas de la page
2. **Vous serez redirigé vers l'aperçu**

### Étape 4 : Installer l'application

1. **Retournez à l'onglet "Aperçu"** (Overview)
2. **Cliquez sur "Installer l'application"** (Install app)
3. **Confirmez** en cliquant sur "Installer" (Install)

### Étape 5 : Récupérer le token

1. **Cliquez sur l'onglet "Identifiants d'API"** (API credentials)
2. **Sous "Admin API access token"**, vous verrez un bouton **"Révéler le token"** (Reveal token)
3. **Cliquez dessus** pour voir le token
4. **Copiez le token** (il commence par `shpat_...`)
5. **⚠️ IMPORTANT** : Gardez ce token secret !

### Étape 6 : Ajouter dans votre projet

Ouvrez `.env.local` et ajoutez :
```env
SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-token-shpat-ici
SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
```

## 🎯 Permissions à activer (résumé)

- ✅ `write_draft_orders` ← **OBLIGATOIRE**
- ✅ `read_draft_orders` ← **OBLIGATOIRE**
- ✅ `read_orders` ← Recommandé

## ✅ Après configuration

Une fois le token ajouté et le serveur redémarré :

1. **Ajoutez un produit au panier** sur votre site
2. **Shopify Admin** → **Commandes** → **Brouillons**
3. **Vous verrez la Draft Order créée automatiquement !**

