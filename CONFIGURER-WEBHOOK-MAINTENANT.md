# ⚡ CONFIGURER LE WEBHOOK MAINTENANT (5 minutes)

## 🔴 Problème Actuel

Vous voyez le paiement sur Stripe mais **PAS la commande sur Shopify** car le webhook n'est pas configuré.

---

## ✅ Solution Rapide : Stripe CLI (Recommandé)

### Étape 1 : Installer Stripe CLI

```bash
brew install stripe/stripe-cli/stripe
```

### Étape 2 : Se Connecter

```bash
stripe login
```

### Étape 3 : Écouter les Webhooks

**Dans un NOUVEAU terminal** (gardez celui avec `npm run dev` ouvert) :

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Étape 4 : Copier le Secret

Vous verrez quelque chose comme :
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**Copiez ce secret** (commence par `whsec_...`)

### Étape 5 : Ajouter dans `.env.local`

Ouvrez `.env.local` et ajoutez :

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

(Remplacez `whsec_xxxxxxxxxxxxx` par le secret que vous avez copié)

### Étape 6 : Redémarrer le Serveur

Dans le terminal où tourne `npm run dev`, arrêtez-le (`Ctrl+C`) et redémarrez :

```bash
npm run dev
```

### Étape 7 : Tester

1. Faites un nouveau paiement test
2. Regardez les logs du serveur - vous devriez voir :
   ```
   ✅ Session Checkout complétée: cs_xxx
   📦 Création de la commande Shopify...
   ✅ Commande Shopify créée: #1001
   ```
3. Vérifiez Shopify Admin → Commandes

---

## 🎯 Résultat Attendu

Après configuration :

✅ **Paiement visible sur Stripe**  
✅ **Commande créée automatiquement dans Shopify**  
✅ **Notification Shopify reçue**

---

## ⚠️ Important

**Gardez les 2 terminaux ouverts** :
- Terminal 1 : `npm run dev` (serveur Next.js)
- Terminal 2 : `stripe listen --forward-to localhost:3000/api/stripe/webhook` (webhook forwarder)

Si vous fermez le terminal avec `stripe listen`, les webhooks ne seront plus forwardés !

---

## 🔍 Vérification

### Dans les Logs du Serveur

Vous devriez voir :
```
✅ Session Checkout complétée: cs_xxx
📦 Création de la commande Shopify...
   Email client: test@example.com
   Nombre d'articles: 3
✅ Commande Shopify créée: #1001
```

### Dans Shopify Admin

1. Allez sur : https://admin.shopify.com/store/jjfyne-1b/orders
2. Vous devriez voir la nouvelle commande
3. Statut : **Payé** ✅

---

## 🐛 Si Ça Ne Fonctionne Toujours Pas

### Vérifiez :

1. ✅ `STRIPE_WEBHOOK_SECRET` est dans `.env.local`
2. ✅ Le serveur a été redémarré après l'ajout
3. ✅ `stripe listen` tourne dans un terminal séparé
4. ✅ Les logs montrent que le webhook est reçu

### Erreur : "Signature ou secret manquant"

→ Vérifiez que `STRIPE_WEBHOOK_SECRET` est bien dans `.env.local` et redémarrez le serveur

### Erreur : "Webhook Error: Invalid signature"

→ Utilisez le secret affiché par `stripe listen` (pas celui du Dashboard)

---

**Configurez maintenant et testez !** 🚀

