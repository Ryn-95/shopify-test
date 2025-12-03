# 🔧 Configuration pour voir les paniers dans Shopify

## ✅ Solution : Utiliser l'API Admin Shopify

J'ai ajouté un système qui crée automatiquement des **"Draft Orders" (Commandes Brouillons)** dans Shopify quand quelqu'un ajoute un produit au panier. Ces Draft Orders sont **visibles dans Shopify Admin** !

## 📋 Étapes de configuration

### 1. Créer une App Admin dans Shopify

1. **Allez sur votre admin Shopify** : `https://admin.shopify.com/store/jjfyne-1b`
2. **Cliquez sur "Paramètres"** (Settings) en bas à gauche
3. **Cliquez sur "Applications et sources de données de vente"**
4. **Cliquez sur "Développer des applications"** (Develop apps)
5. **Cliquez sur "Créer une application"** (Create an app)
6. **Donnez un nom** : "Admin API pour paniers"
7. **Cliquez sur "Créer une application"**

### 2. Configurer les permissions

1. **Dans votre nouvelle application**, cliquez sur **"Configurer les scopes Admin API"**
2. **Activez ces permissions** :
   - ✅ `write_draft_orders` (Créer des commandes brouillons)
   - ✅ `read_draft_orders` (Lire les commandes brouillons)
   - ✅ `read_orders` (Lire les commandes)
3. **Cliquez sur "Enregistrer"**

### 3. Installer l'application

1. **Cliquez sur "Installer l'application"** (Install app)
2. **Confirmez l'installation**

### 4. Récupérer le token Admin API

1. **Dans votre application**, allez dans l'onglet **"API credentials"**
2. **Sous "Admin API access token"**, cliquez sur **"Révéler le token"** (Reveal token)
3. **Copiez le token** (il commence souvent par `shpat_...`)

### 5. Ajouter le token dans votre projet

1. **Ouvrez le fichier** `.env.local` dans votre projet
2. **Ajoutez cette ligne** :
   ```env
   SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-token-admin-ici
   SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
   ```
3. **Remplacez** `votre-token-admin-ici` par le token que vous avez copié
4. **Sauvegardez le fichier**

### 6. Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez-le
npm run dev
```

## 📊 Où voir les paniers dans Shopify

Une fois configuré, quand quelqu'un ajoute un produit au panier :

1. **Allez dans Shopify Admin** → **Commandes**
2. **Cliquez sur "Brouillons"** (Drafts)
3. **Vous verrez toutes les Draft Orders créées !**

Chaque fois qu'un produit est ajouté au panier, une Draft Order est créée automatiquement dans Shopify.

## ✅ Test

1. **Ajoutez un produit au panier** sur votre site
2. **Allez dans Shopify** → **Commandes** → **Brouillons**
3. **Vous devriez voir la Draft Order !**

## 🔍 Vérification

Pour vérifier que ça fonctionne, regardez les logs du serveur Next.js. Vous devriez voir :
```
📝 Création d'une Draft Order dans Shopify...
✅ Draft Order créée: [ID]
   Visible dans: Shopify Admin → Commandes → Brouillons
```

## ⚠️ Note importante

- Les Draft Orders sont **visibles dans Shopify Admin**
- Elles apparaissent dans **Commandes → Brouillons**
- Vous pouvez les convertir en commandes réelles depuis Shopify
- Si l'Admin API n'est pas configurée, le système fonctionne toujours mais sans créer de Draft Orders

