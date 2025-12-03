# ✅ Étapes suivantes - Configuration Admin API

## 🎯 Vous êtes à l'étape : Configuration des permissions

### Étape 1 : Configurer les scopes Admin API

1. **Dans votre application "Admin API pour paniers"**, cliquez sur **"Configuration"** (ou "Configure" en anglais)
2. **Cliquez sur "Configurer les scopes Admin API"** (Configure Admin API scopes)
3. **Activez ces permissions** :
   - ✅ **`write_draft_orders`** - Créer des commandes brouillons
   - ✅ **`read_draft_orders`** - Lire les commandes brouillons  
   - ✅ **`read_orders`** - Lire les commandes (optionnel mais utile)
4. **Cliquez sur "Enregistrer"** (Save)

### Étape 2 : Installer l'application

1. **Retournez à l'onglet "Aperçu"** (Overview)
2. **Cliquez sur "Installer l'application"** (Install app)
3. **Confirmez l'installation**

### Étape 3 : Récupérer le token Admin API

1. **Cliquez sur l'onglet "Identifiants d'API"** (API credentials)
2. **Sous "Admin API access token"**, cliquez sur **"Révéler le token"** (Reveal token)
3. **Copiez le token** (il commence par `shpat_...`)
4. **⚠️ IMPORTANT** : Gardez ce token secret, ne le partagez jamais !

### Étape 4 : Ajouter le token dans votre projet

1. **Ouvrez le fichier** `.env.local` dans votre projet
2. **Ajoutez ces lignes** :
   ```env
   SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-token-shpat-ici
   SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
   ```
3. **Remplacez** `votre-token-shpat-ici` par le token que vous avez copié
4. **Sauvegardez le fichier**

### Étape 5 : Redémarrer le serveur

```bash
# Dans votre terminal, arrêtez le serveur (Ctrl+C)
# Puis relancez-le
npm run dev
```

## ✅ Vérification

Une fois configuré, testez :

1. **Ajoutez un produit au panier** sur votre site (`http://localhost:3000`)
2. **Allez dans Shopify** → **Commandes** → **Brouillons**
3. **Vous devriez voir une Draft Order créée automatiquement !**

## 📍 Où voir les paniers dans Shopify

- **Shopify Admin** → **Commandes** → **Brouillons** ← **ICI !**
- Chaque fois qu'un produit est ajouté au panier, une Draft Order est créée
- Vous verrez toutes les statistiques directement dans Shopify

## 🔍 Vérifier dans les logs

Dans les logs de votre serveur Next.js, vous devriez voir :
```
📝 Création d'une Draft Order dans Shopify...
✅ Draft Order créée: [ID]
   Visible dans: Shopify Admin → Commandes → Brouillons
```

Si vous voyez :
```
⚠️ Admin API non configurée. Les paniers ne seront pas visibles dans Shopify.
```

Cela signifie que le token n'est pas encore configuré ou que le serveur n'a pas été redémarré.

