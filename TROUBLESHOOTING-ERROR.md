# 🔧 Troubleshooting : Internal Server Error

## 🔍 Diagnostic Rapide

### 1. Tester l'API de Base

Testez si les API routes fonctionnent :

```bash
curl http://localhost:3000/api/test
```

**Résultat attendu** :
```json
{"success":true,"message":"API route fonctionne"}
```

---

### 2. Vérifier les Variables d'Environnement

```bash
cat .env.local | grep STRIPE
```

**Doit afficher** :
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

### 3. Vérifier les Logs du Serveur

**Regardez le terminal** où tourne `npm run dev` pour voir l'erreur exacte.

Les logs montrent maintenant :
- ✅ Quand un Payment Intent est créé
- ❌ Les erreurs détaillées avec stack trace
- 📝 Les données reçues

---

### 4. Tester Stripe Directement

```bash
node test-stripe-checkout.js
```

**Résultat attendu** :
```
✅ Payment Intent créé avec succès !
```

---

## 🐛 Erreurs Courantes

### Erreur : "Stripe n'est pas configuré"

**Cause** : `STRIPE_SECRET_KEY` manquante ou invalide

**Solution** :
1. Vérifiez `.env.local`
2. Redémarrez le serveur
3. Vérifiez que la clé commence par `sk_test_`

---

### Erreur : "Cannot read property 'create' of null"

**Cause** : L'instance Stripe n'est pas créée

**Solution** :
1. Vérifiez que `STRIPE_SECRET_KEY` est dans `.env.local`
2. Redémarrez le serveur complètement

---

### Erreur : "Invalid API Key"

**Cause** : Clé Stripe invalide ou expirée

**Solution** :
1. Vérifiez vos clés dans Stripe Dashboard
2. Régénérez-les si nécessaire
3. Mettez à jour `.env.local`

---

## 🔍 Vérification Complète

### Checklist

- [ ] Serveur démarré (`npm run dev`)
- [ ] Variables d'environnement présentes
- [ ] Test API de base fonctionne (`/api/test`)
- [ ] Test Stripe fonctionne (`node test-stripe-checkout.js`)
- [ ] Logs du serveur vérifiés
- [ ] Console du navigateur vérifiée (F12)

---

## 💡 Solution Rapide

1. **Arrêtez le serveur** (Ctrl+C)
2. **Vérifiez** `.env.local` contient les clés Stripe
3. **Redémarrez** : `npm run dev`
4. **Testez** : `node test-stripe-checkout.js`
5. **Regardez les logs** dans le terminal

---

## 📋 Logs Détaillés

Les logs montrent maintenant :
- `📝 Création d'un Payment Intent...` - Début de la requête
- `📦 Données reçues:` - Données reçues
- `💳 Création du Payment Intent avec Stripe...` - Appel Stripe
- `✅ Payment Intent créé:` - Succès
- `❌ Erreur:` - Erreur avec détails complets

**Regardez ces logs pour identifier le problème exact !**

---

## 🆘 Si Rien Ne Fonctionne

1. **Copiez l'erreur exacte** du terminal
2. **Vérifiez** la console du navigateur (F12)
3. **Vérifiez** que toutes les dépendances sont installées :
   ```bash
   npm install
   ```

Les erreurs sont maintenant mieux gérées avec des logs détaillés ! 🔧

