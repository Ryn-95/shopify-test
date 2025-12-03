# 🧪 Guide de Test - Synchronisation avec Shopify

## ✅ Votre site est bien connecté à Shopify !

Le test automatique confirme que votre site Next.js communique correctement avec Shopify.

## 📋 Étapes pour tester manuellement

### 1. Test depuis votre site local

1. **Ouvrez votre site** : `http://localhost:3000`
2. **Ajoutez un produit au panier** en cliquant sur "Ajouter au panier"
3. **Vérifiez le panier** : Cliquez sur "Panier" dans la navigation
4. **Passez à la caisse** : Cliquez sur "Passer à la caisse"
5. **Vous serez redirigé** vers le checkout Shopify sécurisé

### 2. Voir les résultats dans Shopify Dashboard

#### ⚠️ IMPORTANT : Différence entre Panier et Commande

- **Panier (Cart)** : Créé quand un client ajoute un produit → Non visible dans "Commandes"
- **Commande (Order)** : Créée après le checkout complété → Visible dans "Commandes"

#### Pour voir une commande dans Shopify :

1. **Complétez le checkout** sur votre site (même en mode test)
2. **Allez sur votre admin Shopify** : `https://admin.shopify.com/store/jjfyne-1b`
3. **Cliquez sur "Commandes"** dans le menu de gauche
4. **La commande apparaîtra** après le checkout complété

### 3. Mode Test Shopify (Sans payer réellement)

Pour tester sans utiliser de vraie carte bancaire :

1. **Dans Shopify Admin** → **Paramètres** → **Paiements**
2. **Activez le mode test** si disponible
3. **Utilisez les cartes de test Shopify** :
   - Numéro : `1` répété plusieurs fois
   - Date : N'importe quelle date future
   - CVV : N'importe quel code à 3 chiffres

### 4. Vérifier la synchronisation en temps réel

#### Test rapide :

1. **Ajoutez un produit** sur votre site Next.js
2. **Le produit apparaît immédiatement** (pas besoin de rafraîchir)
3. **Ajoutez-le au panier** → Le panier est créé dans Shopify
4. **Complétez le checkout** → La commande apparaît dans Shopify Dashboard

## 🔍 Vérifications dans Shopify Dashboard

### Dans "Commandes" :
- ✅ Toutes les commandes complétées
- ✅ Statut des commandes
- ✅ Détails des produits commandés
- ✅ Informations client

### Dans "Produits" :
- ✅ Tous les produits sont synchronisés
- ✅ Les modifications sur Shopify apparaissent sur votre site
- ✅ Les prix et disponibilités sont à jour

## 🧪 Script de test automatique

Pour tester la connexion rapidement, exécutez :

```bash
node test-sync-shopify.js
```

Ce script :
- ✅ Vérifie la connexion à Shopify
- ✅ Crée un panier
- ✅ Ajoute un produit
- ✅ Génère une URL de checkout pour tester

## ✅ Confirmation

Votre site Next.js est **parfaitement connecté** à Shopify ! 

- ✅ Les produits sont synchronisés en temps réel
- ✅ Les paniers sont créés dans Shopify
- ✅ Les commandes apparaissent dans le dashboard après checkout
- ✅ Tout fonctionne correctement !

## 📞 Besoin d'aide ?

Si vous avez des questions ou des problèmes :
1. Vérifiez les logs dans la console du navigateur (F12)
2. Vérifiez les logs du serveur Next.js
3. Vérifiez que vos variables d'environnement sont correctes dans `.env.local`

