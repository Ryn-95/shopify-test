# 🧪 Test : Recevoir les Notifications Shopify après Paiement Stripe

## 🎯 Objectif

Après un paiement Stripe réussi, vous devriez :
- ✅ Recevoir une notification Shopify (email/app)
- ✅ Voir la commande dans Shopify Admin

---

## ⚡ Configuration Rapide (5 minutes)

### Option 1 : Stripe CLI (Recommandé pour Test Local)

1. **Installez Stripe CLI** :
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Connectez-vous** :
   ```bash
   stripe login
   ```

3. **Dans un nouveau terminal**, démarrez l'écoute des webhooks :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copiez le secret** affiché (commence par `whsec_...`)

5. **Ajoutez-le dans `.env.local`** :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

6. **Redémarrez votre serveur** :
   ```bash
   npm run dev
   ```

---

### Option 2 : Configuration Manuelle (Production)

1. **Allez sur** [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. **Cliquez sur** "Add endpoint"
3. **URL** : `https://votre-domaine.com/api/stripe/webhook`
4. **Événements** : Sélectionnez `checkout.session.completed`
5. **Copiez le secret** et ajoutez-le dans `.env.local`

---

## 🧪 Test

### Étape 1 : Faire un Paiement Test

1. **Allez sur** `/checkout`
2. **Cliquez sur** "Payer avec Stripe"
3. **Utilisez la carte test** : `4242 4242 4242 4242`
4. **Complétez le paiement**

### Étape 2 : Vérifier les Logs

**Dans le terminal où tourne `npm run dev`**, vous devriez voir :

```
✅ Session Checkout complétée: cs_xxx
📦 Création de la commande Shopify...
   Email client: test@example.com
   Nombre d'articles: 3
✅ Commande Shopify créée: #1001
   ID: 123456789
   Total: 30.00 EUR
   Statut financier: paid
```

### Étape 3 : Vérifier Shopify Admin

1. **Allez sur** [Shopify Admin → Commandes](https://admin.shopify.com/store/jjfyne-1b/orders)
2. **Vous devriez voir** la nouvelle commande
3. **Statut** : Payé ✅

### Étape 4 : Vérifier les Notifications

- **Email** : Vérifiez votre boîte mail (notifications Shopify)
- **App Shopify** : Si vous avez l'app installée, vous devriez recevoir une notification

---

## ✅ Résultat Attendu

Après le test :

✅ **Commande créée dans Shopify**  
✅ **Notification Shopify reçue**  
✅ **Commande visible dans Shopify Admin**  
✅ **Statut : Payé**

---

## 🔍 Si Ça Ne Fonctionne Pas

### Le Webhook n'est pas Reçu

1. **Vérifiez** que Stripe CLI tourne (`stripe listen`)
2. **Vérifiez** que `STRIPE_WEBHOOK_SECRET` est dans `.env.local`
3. **Vérifiez** les logs Stripe Dashboard → Webhooks

### La Commande n'est pas Créée

1. **Vérifiez les logs** du serveur pour voir l'erreur
2. **Vérifiez** que `SHOPIFY_ADMIN_API_ACCESS_TOKEN` est configuré
3. **Vérifiez** les permissions Admin API (`write_orders`)

---

## 📚 Documentation Complète

Voir `GUIDE-WEBHOOK-STRIPE.md` pour la configuration complète.

---

**Testez maintenant et vous devriez recevoir les notifications Shopify !** 🎉

