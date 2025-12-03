# 🔍 Diagnostic : Internal Server Error

## ✅ Vérifications Effectuées

- ✅ API routes fonctionnent (`/api/test` répond)
- ✅ Code corrigé avec meilleure gestion d'erreur
- ✅ Logs détaillés ajoutés

---

## 🎯 Pour Identifier le Problème Exact

### Étape 1 : Regarder les Logs du Serveur

**Dans le terminal où tourne `npm run dev`**, vous devriez voir :

- Si tout va bien :
  ```
  📝 Création d'un Payment Intent...
  📦 Données reçues: { amount: 100, currency: 'eur' }
  💳 Création du Payment Intent avec Stripe...
  ✅ Payment Intent créé: pi_xxx
  ```

- Si erreur :
  ```
  ❌ Erreur lors de la création du Payment Intent: [détails]
  ```

**Copiez l'erreur exacte** que vous voyez dans le terminal.

---

### Étape 2 : Vérifier la Console du Navigateur

1. **Ouvrez** votre navigateur
2. **Appuyez sur F12** (DevTools)
3. **Onglet "Console"**
4. **Regardez les erreurs** en rouge

**Copiez les erreurs** que vous voyez.

---

### Étape 3 : Tester Stripe Directement

```bash
node test-stripe-checkout.js
```

**Résultat attendu** :
```
✅ Payment Intent créé avec succès !
```

**Si erreur** : Copiez l'erreur exacte.

---

## 🔧 Solutions Selon l'Erreur

### Erreur : "Stripe n'est pas configuré"

**Solution** :
1. Vérifiez `.env.local` contient `STRIPE_SECRET_KEY=sk_test_...`
2. Redémarrez le serveur : `npm run dev`

---

### Erreur : "Invalid API Key"

**Solution** :
1. Vérifiez vos clés dans Stripe Dashboard
2. Assurez-vous d'utiliser les clés de **test** (`sk_test_...` et `pk_test_...`)
3. Mettez à jour `.env.local`

---

### Erreur : "Cannot read property 'create' of null"

**Solution** :
1. Vérifiez que `STRIPE_SECRET_KEY` est bien dans `.env.local`
2. Redémarrez complètement le serveur
3. Vérifiez les logs au démarrage

---

## 📋 Informations à Me Donner

Pour que je puisse vous aider, j'ai besoin de :

1. **L'erreur exacte** du terminal (où tourne `npm run dev`)
2. **L'erreur de la console** du navigateur (F12)
3. **Le résultat** de `node test-stripe-checkout.js`
4. **La page** où vous voyez l'erreur (ex: `/checkout`)

---

## 🚀 Test Rapide

Testez maintenant :

1. **Allez sur** : `http://localhost:3000/checkout`
2. **Regardez le terminal** pour voir les logs
3. **Ouvrez la console** (F12) pour voir les erreurs
4. **Copiez les erreurs** et dites-moi ce que vous voyez

---

## 💡 Astuce

Les logs sont maintenant **très détaillés**. Regardez le terminal et vous verrez exactement où ça bloque !

**Dites-moi ce que vous voyez dans les logs** et je pourrai vous aider précisément ! 🔍

