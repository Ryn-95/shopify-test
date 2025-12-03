# 🧪 Test Complet de Vente - Guide Étape par Étape

## ✅ Vous avez déjà un paiement Stripe qui fonctionne !

Je vois que vous avez réussi un paiement de **100,00 €** dans Stripe Dashboard. Maintenant, testons le flux complet sur votre site.

---

## 🚀 Test Complet sur Votre Site

### Étape 1 : Vérifier la Configuration

Assurez-vous que votre serveur tourne :

```bash
npm run dev
```

Votre site devrait être accessible sur : `http://localhost:3000`

---

### Étape 2 : Ajouter des Produits au Panier

1. **Allez sur** : `http://localhost:3000`
2. **Parcourez les produits**
3. **Cliquez sur "Ajouter au panier"** pour un ou plusieurs produits
4. **Vérifiez** que le compteur de panier se met à jour (en haut à droite)

---

### Étape 3 : Aller au Panier

1. **Cliquez sur "Panier"** dans la navbar
2. **Vérifiez** :
   - Les produits ajoutés sont visibles
   - Les quantités sont correctes
   - Le total est calculé

---

### Étape 4 : Passer à la Caisse

1. **Cliquez sur "Passer à la caisse"**
2. **Vous arrivez sur** : `/checkout`
3. **Vérifiez** :
   - Résumé de la commande à gauche
   - Formulaire de paiement à droite
   - Toggle "Stripe" / "Shopify" en haut

---

### Étape 5 : Choisir Stripe et Payer

1. **Assurez-vous que "Stripe" est sélectionné** (toggle)
2. **Remplissez le formulaire de paiement** :
   - **Numéro de carte** : `4242 4242 4242 4242`
   - **Date d'expiration** : `12/26` (ou toute date future)
   - **CVC** : `123`
   - **Code postal** : `12345`
   - **Nom sur la carte** : `Test User`
3. **Cliquez sur "Payer [montant] €"**

---

### Étape 6 : Résultat Attendu

**Si tout fonctionne** :
- ✅ Message : "Paiement réussi !"
- ✅ Redirection automatique vers `/checkout/success`
- ✅ Page de confirmation avec numéro de commande

**Si erreur** :
- ❌ Message d'erreur affiché
- Vérifiez les logs dans la console du navigateur (F12)
- Vérifiez les logs du serveur dans le terminal

---

## 📊 Vérification Après le Test

### Dans Stripe Dashboard

1. **Allez sur** : https://dashboard.stripe.com/test/payments
2. **Vous devriez voir** :
   - Un nouveau paiement avec le montant de votre panier
   - Statut : "Succeeded"
   - Détails du paiement

### Dans Shopify Admin

1. **Allez sur** : Shopify Admin → **Commandes**
2. **Vous devriez voir** :
   - Une nouvelle commande créée automatiquement
   - Statut : "Payée" (si le webhook fonctionne)
   - Détails de la commande avec les produits

### Dans Votre Site

1. **Page de succès** : `/checkout/success`
   - Confirmation de commande
   - Numéro de commande

2. **Compte client** : `/account` → Onglet "Commandes"
   - Historique des commandes (si connecté)

---

## 🔍 Dépannage

### Problème : "Stripe n'est pas configuré"

**Solution** :
1. Vérifiez que `.env.local` contient :
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
2. Redémarrez le serveur : `npm run dev`

### Problème : "Payment Intent creation failed"

**Solution** :
1. Vérifiez que `STRIPE_SECRET_KEY` est correcte
2. Vérifiez les logs du serveur pour l'erreur exacte
3. Vérifiez que la clé commence par `sk_test_` (mode test)

### Problème : Paiement réussi mais pas de commande dans Shopify

**Solution** :
1. Vérifiez que le webhook Stripe est configuré
2. Vérifiez les logs du serveur pour les erreurs webhook
3. En développement local, utilisez Stripe CLI :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

---

## 🎯 Scénarios de Test

### Test 1 : Vente Simple

1. Ajouter 1 produit
2. Payer avec Stripe
3. Vérifier la commande

### Test 2 : Vente Multiple

1. Ajouter plusieurs produits
2. Modifier les quantités
3. Payer avec Stripe
4. Vérifier que tous les produits sont dans la commande

### Test 3 : Paiement Échoué

1. Utiliser la carte : `4000 0000 0000 0002`
2. Tenter le paiement
3. Vérifier le message d'erreur
4. Vérifier qu'aucune commande n'est créée

### Test 4 : Avec Compte Client

1. Créer un compte : `/login` → Inscription
2. Se connecter
3. Ajouter des produits
4. Payer
5. Vérifier dans `/account` → Commandes

---

## 💳 Cartes de Test Stripe

### Cartes qui Fonctionnent

- **Succès** : `4242 4242 4242 4242`
- **Succès (3D Secure)** : `4000 0025 0000 3155`
- **Succès (Débit)** : `4000 0566 5566 5556`

### Cartes qui Échouent

- **Échec générique** : `4000 0000 0000 0002`
- **Carte refusée** : `4000 0000 0000 9995`
- **Fonds insuffisants** : `4000 0000 0000 9995`

**Plus de cartes** : https://stripe.com/docs/testing

---

## ✅ Checklist de Test

- [ ] Serveur démarré (`npm run dev`)
- [ ] Produits ajoutés au panier
- [ ] Panier accessible (`/cart`)
- [ ] Page checkout accessible (`/checkout`)
- [ ] Stripe sélectionné (toggle)
- [ ] Formulaire de paiement visible
- [ ] Paiement testé avec carte `4242 4242 4242 4242`
- [ ] Redirection vers `/checkout/success`
- [ ] Paiement visible dans Stripe Dashboard
- [ ] Commande créée dans Shopify (si webhook configuré)

---

## 🎉 C'est Tout !

Vous pouvez maintenant tester des ventes complètes sur votre site ! 🚀

**Besoin d'aide ?** Vérifiez les logs dans :
- Console du navigateur (F12)
- Terminal du serveur
- Stripe Dashboard → Logs

