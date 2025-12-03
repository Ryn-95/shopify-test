# 🔔 Guide : Configuration Webhook Stripe pour Notifications Shopify

## ✅ Ce qui a été Configuré

Le système crée maintenant **automatiquement une commande Shopify** après chaque paiement Stripe réussi.

---

## 🔄 Comment Ça Fonctionne

1. **Client paie via Stripe Checkout**
2. **Stripe envoie un webhook** à votre serveur (`checkout.session.completed`)
3. **Votre serveur crée une commande Shopify** avec les produits achetés
4. **Vous recevez une notification Shopify** (email, app, etc.)

---

## ⚙️ Configuration du Webhook Stripe

### Étape 1 : Obtenir l'URL de votre Webhook

**En développement local** :
- Utilisez **ngrok** ou **Stripe CLI** pour exposer votre serveur local
- URL exemple : `https://votre-domaine.ngrok.io/api/stripe/webhook`

**En production** :
- URL : `https://votre-domaine.com/api/stripe/webhook`

---

### Étape 2 : Configurer le Webhook dans Stripe Dashboard

1. **Allez sur** [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. **Cliquez sur** "Add endpoint"
3. **Entrez l'URL** : `https://votre-domaine.com/api/stripe/webhook`
4. **Sélectionnez les événements** :
   - ✅ `checkout.session.completed` (obligatoire)
   - ✅ `payment_intent.succeeded` (optionnel, pour ancien système)
   - ✅ `payment_intent.payment_failed` (optionnel, pour logs)
5. **Cliquez sur** "Add endpoint"

---

### Étape 3 : Récupérer le Secret du Webhook

1. **Dans Stripe Dashboard**, cliquez sur votre webhook
2. **Copiez le "Signing secret"** (commence par `whsec_...`)
3. **Ajoutez-le dans `.env.local`** :

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### Étape 4 : Redémarrer le Serveur

```bash
npm run dev
```

---

## 🧪 Test en Local avec Stripe CLI

### Option 1 : Stripe CLI (Recommandé)

1. **Installez Stripe CLI** :
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Connectez-vous** :
   ```bash
   stripe login
   ```

3. **Écoutez les webhooks** :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copiez le secret** affiché (commence par `whsec_...`)
5. **Ajoutez-le dans `.env.local`** :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

6. **Redémarrez le serveur** :
   ```bash
   npm run dev
   ```

7. **Testez un paiement** et le webhook sera automatiquement forwardé !

---

### Option 2 : ngrok

1. **Installez ngrok** :
   ```bash
   brew install ngrok
   ```

2. **Démarrez votre serveur** :
   ```bash
   npm run dev
   ```

3. **Exposez le port 3000** :
   ```bash
   ngrok http 3000
   ```

4. **Copiez l'URL HTTPS** (ex: `https://abc123.ngrok.io`)
5. **Dans Stripe Dashboard**, créez un webhook avec l'URL :
   ```
   https://abc123.ngrok.io/api/stripe/webhook
   ```

6. **Copiez le secret** et ajoutez-le dans `.env.local`

---

## ✅ Vérification

### Après un Paiement Réussi

1. **Vérifiez les logs du serveur** :
   ```
   ✅ Session Checkout complétée: cs_xxx
   📦 Création de la commande Shopify...
   ✅ Commande Shopify créée: #1001
   ```

2. **Vérifiez Shopify Admin** :
   - Allez sur **Shopify Admin → Commandes**
   - Vous devriez voir la nouvelle commande
   - Statut : **Payé** (Financial status: paid)

3. **Vérifiez votre email** :
   - Vous devriez recevoir une notification Shopify
   - Email de confirmation de commande

---

## 🔍 Dépannage

### Le Webhook n'est pas Reçu

1. **Vérifiez l'URL** dans Stripe Dashboard
2. **Vérifiez que le serveur tourne** (`npm run dev`)
3. **Vérifiez les logs** Stripe Dashboard → Webhooks → Votre webhook → Logs

### Erreur : "Signature ou secret manquant"

**Solution** :
- Vérifiez que `STRIPE_WEBHOOK_SECRET` est dans `.env.local`
- Redémarrez le serveur après l'ajout

### Erreur : "Webhook Error: Invalid signature"

**Solution** :
- Vérifiez que le secret correspond bien au webhook
- En local avec Stripe CLI, utilisez le secret affiché par `stripe listen`

### La Commande n'est pas Créée dans Shopify

**Vérifiez** :
1. Les logs du serveur pour voir l'erreur exacte
2. Que `SHOPIFY_ADMIN_API_ACCESS_TOKEN` est configuré
3. Que les permissions Admin API incluent `write_orders`

---

## 📋 Checklist

- [ ] Webhook configuré dans Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` dans `.env.local`
- [ ] Serveur redémarré
- [ ] Test de paiement effectué
- [ ] Commande visible dans Shopify Admin
- [ ] Notification reçue (email/app)

---

## 🎯 Résultat Attendu

Après chaque paiement Stripe réussi :

✅ **Commande créée dans Shopify**  
✅ **Notification Shopify reçue** (email/app)  
✅ **Commande visible dans Shopify Admin → Commandes**  
✅ **Statut financier : Payé**

---

## 💡 Astuce

**En développement**, utilisez **Stripe CLI** pour tester facilement les webhooks sans configurer ngrok.

**En production**, configurez le webhook dans Stripe Dashboard avec votre URL de production.

---

**Le système est maintenant configuré pour créer automatiquement les commandes Shopify !** 🎉

