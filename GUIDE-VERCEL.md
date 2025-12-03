# 🚀 Guide : Déploiement sur Vercel

## ✅ Déploiement Effectué

Le site a été déployé sur Vercel !

---

## 🔗 URLs du Site

### Production
- **URL principale** : https://shopify-nextjs-store-rd1fm30f1-ryns-projects-df7e5921.vercel.app
- **Dashboard Vercel** : https://vercel.com/ryns-projects-df7e5921/shopify-nextjs-store

---

## ⚙️ Configuration des Variables d'Environnement

**IMPORTANT** : Vous devez configurer les variables d'environnement sur Vercel !

### Étape 1 : Aller sur Vercel Dashboard

1. Allez sur : https://vercel.com/ryns-projects-df7e5921/shopify-nextjs-store/settings/environment-variables

### Étape 2 : Ajouter les Variables

Ajoutez toutes ces variables d'environnement :

```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre_storefront_access_token

# Shopify Admin API
SHOPIFY_ADMIN_API_ACCESS_TOKEN=shpat_votre_admin_api_token
SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com

# Stripe
STRIPE_SECRET_KEY=sk_test_votre_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_... # Si vous avez configuré le webhook

# Base URL (optionnel, Vercel le détecte automatiquement)
NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
```

### Étape 3 : Redéployer

Après avoir ajouté les variables, Vercel redéploiera automatiquement le site.

---

## 🔄 Redéploiement

Pour redéployer après avoir ajouté les variables :

```bash
vercel --prod
```

Ou depuis le Dashboard Vercel, cliquez sur "Redeploy".

---

## ✅ Vérification

1. **Allez sur** l'URL de production
2. **Vérifiez** que les produits s'affichent
3. **Testez** l'ajout au panier
4. **Testez** le checkout Stripe

---

## 🐛 Si le Site ne Fonctionne Pas

### Erreur : "Products not loading"

→ Vérifiez que `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` est configuré

### Erreur : "Stripe not configured"

→ Vérifiez que `STRIPE_SECRET_KEY` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sont configurés

### Erreur : "Admin API not configured"

→ Vérifiez que `SHOPIFY_ADMIN_API_ACCESS_TOKEN` est configuré

---

## 📚 Documentation Vercel

- **Dashboard** : https://vercel.com/dashboard
- **Documentation** : https://vercel.com/docs
- **Variables d'environnement** : https://vercel.com/docs/concepts/projects/environment-variables

---

**Le site est déployé ! Configurez les variables d'environnement pour qu'il fonctionne correctement.** 🚀

