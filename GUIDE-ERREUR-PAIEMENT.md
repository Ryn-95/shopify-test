# 🔍 Guide : Erreur lors du Paiement Stripe

## ✅ Améliorations Apportées

J'ai amélioré le composant Stripe pour :
- ✅ Afficher des messages d'erreur plus détaillés
- ✅ Montrer l'état de chargement de Stripe
- ✅ Afficher des informations de test en mode développement
- ✅ Meilleure gestion des erreurs

---

## 🎯 Pour Identifier le Problème Exact

### Étape 1 : Ouvrir la Console du Navigateur

1. **Ouvrez** votre navigateur sur la page de checkout
2. **Appuyez sur F12** (ou Cmd+Option+I sur Mac)
3. **Onglet "Console"**
4. **Regardez les messages** en rouge ou jaune

**Copiez les erreurs** que vous voyez.

---

### Étape 2 : Vérifier les Logs du Serveur

**Dans le terminal où tourne `npm run dev`**, regardez les messages :

- ✅ Si tout va bien :
  ```
  📝 Création d'un Payment Intent...
  📦 Données reçues: { amount: 30, currency: 'eur' }
  💳 Création du Payment Intent avec Stripe...
  ✅ Payment Intent créé: pi_xxx
  ```

- ❌ Si erreur :
  ```
  ❌ Erreur lors de la création du Payment Intent: [détails]
  ```

**Copiez l'erreur exacte** que vous voyez.

---

### Étape 3 : Tester avec une Carte de Test

**⚠️ IMPORTANT : En mode développement, vous DEVEZ utiliser une carte de test Stripe !**

#### Cartes de Test Stripe :

1. **Carte qui fonctionne toujours** :
   - Numéro : `4242 4242 4242 4242`
   - Date : N'importe quelle date future (ex: 12/25)
   - CVC : N'importe quel 3 chiffres (ex: 123)
   - Code postal : N'importe quel code postal

2. **Carte avec 3D Secure** :
   - Numéro : `4000 0025 0000 3155`
   - Date : N'importe quelle date future
   - CVC : N'importe quel 3 chiffres

3. **Carte qui échoue** :
   - Numéro : `4000 0000 0000 0002`
   - Date : N'importe quelle date future
   - CVC : N'importe quel 3 chiffres

---

## 🔧 Solutions Selon l'Erreur

### Erreur : "Stripe n'est pas configuré"

**Solution** :
1. Vérifiez `.env.local` contient :
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
2. Redémarrez le serveur : `npm run dev`

---

### Erreur : "Invalid API Key"

**Solution** :
1. Vérifiez vos clés dans [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Assurez-vous d'utiliser les clés de **test** (`sk_test_...` et `pk_test_...`)
3. Mettez à jour `.env.local`
4. Redémarrez le serveur

---

### Erreur : "Your card was declined"

**Solution** :
- Utilisez une carte de test Stripe (voir ci-dessus)
- Ne pas utiliser une vraie carte en mode développement

---

### Erreur : "Payment method not available"

**Solution** :
1. Vérifiez que `automatic_payment_methods` est activé dans l'API
2. Vérifiez que votre compte Stripe est en mode test

---

### Erreur : "Network error" ou "Failed to fetch"

**Solution** :
1. Vérifiez votre connexion internet
2. Vérifiez que le serveur Next.js tourne (`npm run dev`)
3. Vérifiez que l'API `/api/stripe/create-payment-intent` répond

---

## 📋 Informations à Me Donner

Pour que je puisse vous aider, j'ai besoin de :

1. **L'erreur exacte** affichée sur la page (le message rouge)
2. **L'erreur de la console** du navigateur (F12 → Console)
3. **L'erreur du terminal** (où tourne `npm run dev`)
4. **La carte utilisée** (test ou réelle ?)

---

## ✅ Test Rapide

1. **Actualisez la page** (`F5` ou `Cmd+R`)
2. **Remplissez le formulaire** avec la carte de test : `4242 4242 4242 4242`
3. **Cliquez sur "Payer"**
4. **Regardez les messages** dans la console et sur la page

---

## 💡 Astuce

En mode développement, vous verrez maintenant :
- Un message d'aide avec les cartes de test
- Des messages d'erreur plus détaillés
- Un indicateur de chargement

**Testez maintenant et dites-moi quelle erreur exacte vous voyez !** 🔍

