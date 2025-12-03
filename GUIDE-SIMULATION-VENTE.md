# 🛒 Guide : Simulation de Vente Complète

## 🎯 Objectif

Simuler une vente complète de A à Z : ajout au panier → paiement → commande créée.

---

## 🧪 Simulation avec Stripe (Recommandé)

### Étape 1 : Configuration Stripe

1. **Créez un compte Stripe** : https://stripe.com
2. **Récupérez vos clés API** (mode test)
3. **Ajoutez dans** `.env.local` :
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### Étape 2 : Simulation de vente

1. **Démarrez votre site** :
   ```bash
   npm run dev
   ```

2. **Allez sur** : `http://localhost:3000`

3. **Ajoutez des produits au panier** :
   - Parcourez les produits
   - Cliquez sur "Ajouter au panier"
   - Vérifiez le compteur de panier

4. **Allez au panier** : `/cart`
   - Vérifiez les produits
   - Vérifiez le total

5. **Passez à la caisse** : Cliquez sur "Passer à la caisse"
   - Vous arrivez sur `/checkout`

6. **Choisissez Stripe** (toggle en haut)

7. **Remplissez le formulaire de paiement** :
   - **Numéro de carte** : `4242 4242 4242 4242`
   - **Date d'expiration** : `12/25` (ou toute date future)
   - **CVC** : `123`
   - **Code postal** : `12345`

8. **Cliquez sur "Payer"**

9. **Résultat** :
   - ✅ Paiement traité
   - ✅ Redirection vers `/checkout/success`
   - ✅ Commande visible dans Stripe Dashboard
   - ✅ Commande créée dans Shopify (via webhook)

---

## 🧪 Simulation avec Shopify Checkout

### Alternative : Utiliser le checkout Shopify natif

1. **Allez sur** : `/cart`
2. **Cliquez sur "Passer à la caisse"**
3. **Choisissez "Shopify"** (toggle)
4. **Cliquez sur "Payer avec Shopify"**
5. **Vous êtes redirigé** vers le checkout Shopify sécurisé
6. **Remplissez les informations** :
   - Email
   - Adresse de livraison
   - Méthode de paiement (carte de test)
7. **Confirmez la commande**

**Résultat** :
- ✅ Commande créée dans Shopify
- ✅ Visible dans Shopify Admin → Commandes

---

## 📊 Vérification de la Vente

### Dans Stripe Dashboard

1. **Allez sur** : https://dashboard.stripe.com/test/payments
2. **Vous devriez voir** :
   - Le paiement de test
   - Statut : "Succeeded"
   - Montant : Le total de votre commande

### Dans Shopify Admin

1. **Allez sur** : Shopify Admin → **Commandes**
2. **Vous devriez voir** :
   - La nouvelle commande
   - Statut : "Payée" (si paiement réussi)
   - Détails de la commande

### Dans votre site

1. **Page de succès** : `/checkout/success`
   - Confirmation de commande
   - Numéro de commande

2. **Compte client** : `/account` → Onglet "Commandes"
   - Historique des commandes
   - Détails de chaque commande

---

## 🎯 Scénarios de Test

### Test 1 : Vente simple

1. Ajouter 1 produit au panier
2. Passer à la caisse
3. Payer avec Stripe
4. Vérifier la commande

### Test 2 : Vente multiple

1. Ajouter plusieurs produits au panier
2. Modifier les quantités
3. Passer à la caisse
4. Payer avec Stripe
5. Vérifier que tous les produits sont dans la commande

### Test 3 : Paiement échoué

1. Utiliser la carte de test : `4000 0000 0000 0002`
2. Tenter le paiement
3. Vérifier le message d'erreur
4. Vérifier qu'aucune commande n'est créée

### Test 4 : Commande avec compte client

1. Créer un compte : `/login` → Inscription
2. Se connecter
3. Ajouter des produits au panier
4. Passer à la caisse
5. Payer
6. Vérifier dans `/account` → Commandes

---

## 💳 Cartes de Test Stripe

### Cartes qui fonctionnent

- **Succès** : `4242 4242 4242 4242`
- **Succès (3D Secure)** : `4000 0025 0000 3155`
- **Succès (Débit)** : `4000 0566 5566 5556`

### Cartes qui échouent

- **Échec générique** : `4000 0000 0000 0002`
- **Carte refusée** : `4000 0000 0000 9995`
- **Fonds insuffisants** : `4000 0000 0000 9995`

**Plus de cartes** : https://stripe.com/docs/testing

---

## 🔔 Notifications

### Après une vente réussie

1. **Email automatique** (si configuré dans Shopify)
2. **Notification dans Shopify Admin**
3. **Webhook Stripe** (si configuré)
4. **Notification sur votre site** (si configuré)

---

## 📈 Statistiques

### Voir les statistiques

1. **Stripe Dashboard** → **Paiements**
   - Nombre de paiements
   - Montant total
   - Taux de réussite

2. **Shopify Admin** → **Analyses**
   - Commandes totales
   - Chiffre d'affaires
   - Produits vendus

---

## ✅ Checklist Simulation

- [ ] Stripe configuré (clés API)
- [ ] Produits ajoutés au panier
- [ ] Paiement testé avec carte de test
- [ ] Commande vérifiée dans Shopify
- [ ] Paiement vérifié dans Stripe
- [ ] Page de succès fonctionnelle
- [ ] Historique des commandes visible

---

## 🎉 C'est tout !

Vous pouvez maintenant simuler des ventes complètes sur votre site ! 🚀

**Prochaines étapes** :
- Tester différents scénarios
- Configurer les webhooks pour production
- Personnaliser les emails de confirmation
- Ajouter d'autres méthodes de paiement

