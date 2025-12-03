# 🐛 Debug : Internal Server Error

## 🔍 Diagnostic

Si vous voyez "Internal Server Error", voici comment diagnostiquer :

---

## ✅ Vérifications Rapides

### 1. Vérifier les Variables d'Environnement

```bash
# Vérifiez que .env.local contient bien :
cat .env.local | grep STRIPE
```

**Doit afficher** :
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 2. Redémarrer le Serveur

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

### 3. Vérifier les Logs

**Regardez le terminal** où tourne `npm run dev` pour voir l'erreur exacte.

---

## 🔧 Erreurs Courantes

### Erreur : "STRIPE_SECRET_KEY manquante"

**Solution** :
1. Vérifiez que `.env.local` contient `STRIPE_SECRET_KEY=sk_test_...`
2. Redémarrez le serveur

### Erreur : "Stripe n'est pas configuré"

**Solution** :
1. Vérifiez les variables d'environnement
2. Assurez-vous que le serveur a été redémarré après l'ajout des clés

### Erreur : "Payment Intent creation failed"

**Solution** :
1. Vérifiez que `STRIPE_SECRET_KEY` est correcte
2. Vérifiez les logs du serveur pour l'erreur exacte
3. Testez avec : `node test-stripe-checkout.js`

---

## 🧪 Test Rapide

Testez la configuration Stripe :

```bash
node test-stripe-checkout.js
```

**Résultat attendu** :
```
✅ Payment Intent créé avec succès !
```

---

## 📋 Checklist de Debug

- [ ] Variables d'environnement présentes dans `.env.local`
- [ ] Serveur redémarré après modification de `.env.local`
- [ ] Test Stripe réussi (`node test-stripe-checkout.js`)
- [ ] Logs du serveur vérifiés
- [ ] Console du navigateur vérifiée (F12)

---

## 💡 Solution Rapide

Si l'erreur persiste :

1. **Arrêtez le serveur** (Ctrl+C)
2. **Vérifiez** `.env.local` contient bien les clés Stripe
3. **Redémarrez** : `npm run dev`
4. **Testez** : `node test-stripe-checkout.js`

---

## 🆘 Si ça ne marche toujours pas

1. **Copiez l'erreur exacte** du terminal
2. **Vérifiez** la console du navigateur (F12)
3. **Vérifiez** les logs du serveur

Les erreurs ont été corrigées dans le code pour être plus explicites ! 🔧

