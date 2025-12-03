# 💳 Guide d'Intégration Stripe

## 🎯 Objectif

Intégrer Stripe pour permettre les paiements directement sur votre site, en plus du checkout Shopify.

---

## 📋 Configuration Stripe

### Étape 1 : Créer un compte Stripe

1. **Allez sur** : https://stripe.com
2. **Créez un compte** (gratuit)
3. **Activez votre compte** (vérification d'identité)

### Étape 2 : Récupérer les clés API

1. **Dashboard Stripe** → **Développeurs** → **Clés API**
2. **Copiez** :
   - **Clé publique** (Publishable key) - Commence par `pk_test_...` ou `pk_live_...`
   - **Clé secrète** (Secret key) - Commence par `sk_test_...` ou `sk_live_...`

### Étape 3 : Ajouter dans `.env.local`

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_ici
```

**Important** :
- En développement, utilisez les clés `test` (`pk_test_...` et `sk_test_...`)
- En production, utilisez les clés `live` (`pk_live_...` et `sk_live_...`)

---

## 🔧 Configuration Webhook Stripe

### Pour recevoir les notifications de paiement

1. **Dashboard Stripe** → **Développeurs** → **Webhooks**
2. **Ajouter un endpoint** :
   - **URL** : `https://votre-domaine.com/api/stripe/webhook`
   - **Événements à écouter** :
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
3. **Copiez le secret du webhook** (`whsec_...`)
4. **Ajoutez-le dans** `.env.local` : `STRIPE_WEBHOOK_SECRET`

**Note** : En développement local, utilisez Stripe CLI pour tester les webhooks :
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## 🧪 Mode Test Stripe

### Cartes de test

Stripe fournit des cartes de test pour simuler les paiements :

**Carte de test réussie** :
- Numéro : `4242 4242 4242 4242`
- Date : N'importe quelle date future (ex: `12/25`)
- CVC : N'importe quel 3 chiffres (ex: `123`)
- Code postal : N'importe quel code postal (ex: `12345`)

**Carte de test échouée** :
- Numéro : `4000 0000 0000 0002`

**Autres cartes de test** :
- Voir : https://stripe.com/docs/testing

---

## 🚀 Utilisation

### Sur votre site

1. **Ajoutez des produits au panier**
2. **Allez sur** : `/cart`
3. **Cliquez sur "Passer à la caisse"**
4. **Choisissez "Stripe"** (toggle en haut)
5. **Remplissez les informations de paiement**
6. **Utilisez une carte de test** : `4242 4242 4242 4242`
7. **Confirmez le paiement**

### Résultat

- ✅ Paiement traité par Stripe
- ✅ Redirection vers `/checkout/success`
- ✅ Commande créée dans Shopify (via webhook)

---

## 📊 Vérification

### Dans Stripe Dashboard

1. **Paiements** → Vous devriez voir les paiements de test
2. **Événements** → Voir les webhooks reçus

### Dans Shopify

1. **Commandes** → Les commandes créées après paiement réussi

---

## 🔒 Sécurité

### Bonnes pratiques

1. ✅ **Ne jamais exposer** `STRIPE_SECRET_KEY` côté client
2. ✅ **Utiliser HTTPS** en production
3. ✅ **Valider les webhooks** avec la signature
4. ✅ **Utiliser les clés de test** en développement

---

## 🐛 Dépannage

### Erreur : "Stripe n'est pas configuré"

**Solution** : Vérifiez que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` est dans `.env.local`

### Erreur : "Payment Intent creation failed"

**Solution** : Vérifiez que `STRIPE_SECRET_KEY` est correcte et valide

### Webhook ne fonctionne pas

**Solution** :
1. Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct
2. En local, utilisez Stripe CLI : `stripe listen --forward-to localhost:3000/api/stripe/webhook`

---

## 📚 Documentation

- **Stripe Docs** : https://stripe.com/docs
- **Stripe React** : https://stripe.com/docs/stripe-js/react
- **Stripe Testing** : https://stripe.com/docs/testing

---

## ✅ Checklist

- [ ] Compte Stripe créé
- [ ] Clés API récupérées
- [ ] Variables d'environnement configurées
- [ ] Webhook configuré (production)
- [ ] Test de paiement effectué
- [ ] Vérification dans Stripe Dashboard

---

Tout est prêt ! 🎉

