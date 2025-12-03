# 🚀 Commandes Rapides pour Configurer le Webhook

## Copiez-Collez Ces Commandes

### Terminal 1 : Installer Stripe CLI (une seule fois)

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

### Terminal 2 : Écouter les Webhooks (à garder ouvert)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**Copiez le secret affiché** (commence par `whsec_...`)

### Terminal 3 : Ajouter le Secret dans .env.local

```bash
echo "STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET_ICI" >> .env.local
```

(Remplacez `whsec_VOTRE_SECRET_ICI` par le secret copié)

### Terminal 1 : Redémarrer le Serveur

```bash
# Arrêtez avec Ctrl+C, puis :
npm run dev
```

---

## ✅ Test

1. Faites un paiement test
2. Regardez les logs - vous devriez voir la commande créée
3. Vérifiez Shopify Admin → Commandes

---

**C'est tout !** 🎉

