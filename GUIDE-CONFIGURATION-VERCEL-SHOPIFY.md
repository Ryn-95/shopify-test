# 🔧 GUIDE : CONFIGURER SHOPIFY SUR VERCEL

## ⚠️ Problème Actuel

Votre site est déployé sur Vercel mais les produits Shopify ne s'affichent pas car les **variables d'environnement** ne sont pas configurées.

---

## ✅ SOLUTION : Configurer les Variables d'Environnement

### **Étape 1 : Accéder au Dashboard Vercel**

1. Allez sur : **https://vercel.com/dashboard**
2. Connectez-vous avec votre compte GitHub/Vercel
3. Cliquez sur votre projet : **shopify-nextjs-store**

### **Étape 2 : Ouvrir les Paramètres**

1. Cliquez sur l'onglet **"Settings"** (Paramètres) en haut
2. Dans le menu de gauche, cliquez sur **"Environment Variables"** (Variables d'environnement)

### **Étape 3 : Ajouter les Variables Shopify**

Cliquez sur **"Add New"** et ajoutez **UNE PAR UNE** ces variables :

#### **1. Shopify Storefront Domain**

- **Name** : `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- **Value** : `jjfyne-1b.myshopify.com`
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **2. Shopify Storefront Access Token**

- **Name** : `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- **Value** : `e8e1e98f531a32d86c9925a633789056`
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **3. Shopify Admin API Access Token** (pour les commandes)

- **Name** : `SHOPIFY_ADMIN_API_ACCESS_TOKEN`
- **Value** : `votre_token_admin_shopify` (remplacez par votre vrai token)
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **4. Shopify Store Domain** (pour Admin API)

- **Name** : `SHOPIFY_STORE_DOMAIN`
- **Value** : `jjfyne-1b.myshopify.com`
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **5. Stripe Secret Key** (pour les paiements)

- **Name** : `STRIPE_SECRET_KEY`
- **Value** : `sk_test_votre_cle_stripe` (remplacez par votre vraie clé)
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **6. Stripe Publishable Key** (pour les paiements)

- **Name** : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Value** : `pk_test_votre_cle_stripe` (remplacez par votre vraie clé)
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

#### **7. Base URL** (pour les redirections)

- **Name** : `NEXT_PUBLIC_BASE_URL`
- **Value** : `https://votre-domaine.vercel.app` (remplacez par votre URL Vercel)
- **Environment** : ✅ Production ✅ Preview ✅ Development (cochez les 3)

Cliquez sur **"Save"**

---

## 🔄 Étape 4 : Redéployer le Site

Après avoir ajouté toutes les variables :

### **Option 1 : Redéploiement Automatique**

Vercel redéploiera automatiquement le site dans quelques secondes.

### **Option 2 : Redéploiement Manuel**

1. Allez sur l'onglet **"Deployments"** (Déploiements)
2. Cliquez sur les **3 points** (⋯) du dernier déploiement
3. Cliquez sur **"Redeploy"**
4. Confirmez avec **"Redeploy"**

---

## ✅ Étape 5 : Vérifier que ça Fonctionne

1. Attendez 1-2 minutes que le déploiement se termine
2. Allez sur votre site Vercel
3. **Actualisez la page** (F5 ou Cmd+R)
4. Les produits Shopify devraient maintenant s'afficher ! 🎉

---

## 🔍 Comment Obtenir vos Tokens Shopify

### **Storefront Access Token** (déjà connu)
- Vous l'avez déjà : `e8e1e98f531a32d86c9925a633789056`
- Si besoin : Shopify Admin → Apps → Develop apps → Storefront API → View API token

### **Admin API Access Token**
1. Allez sur : https://jjfyne-1b.myshopify.com/admin
2. **Apps** → **Develop apps** → Créez une nouvelle app
3. Configurez les permissions :
   - ✅ `read_products`
   - ✅ `write_orders`
   - ✅ `read_customers`
   - ✅ `write_customers`
4. **Install app** → Copiez le **Admin API access token**

### **Stripe Keys**
1. Allez sur : https://dashboard.stripe.com/test/apikeys
2. Copiez **Secret key** (commence par `sk_test_`)
3. Copiez **Publishable key** (commence par `pk_test_`)

---

## 📝 Liste Complète des Variables à Ajouter

Copiez-collez cette liste pour vérifier que vous avez tout :

```
✅ NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
✅ NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=e8e1e98f531a32d86c9925a633789056
✅ SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre_token_admin
✅ SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
✅ STRIPE_SECRET_KEY=sk_test_...
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
✅ NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
```

---

## 🆘 Problèmes Courants

### **Les produits ne s'affichent toujours pas**

1. Vérifiez que vous avez **coché les 3 environnements** (Production, Preview, Development)
2. Vérifiez que vous avez **redéployé** après avoir ajouté les variables
3. Vérifiez que les **noms des variables** sont exacts (copiez-collez depuis ce guide)
4. Vérifiez que vous avez des **produits publiés** dans Shopify Admin

### **Erreur "Variables d'environnement non configurées"**

- Les variables doivent commencer par `NEXT_PUBLIC_` pour être accessibles côté client
- Vérifiez qu'il n'y a pas d'espaces avant/après les valeurs

### **Le site ne redéploie pas automatiquement**

- Allez dans **Deployments** → Cliquez sur **Redeploy** manuellement
- Attendez 1-2 minutes

---

## 🎯 Résultat Attendu

Après configuration, votre site devrait :
- ✅ Afficher tous les produits Shopify
- ✅ Permettre d'ajouter au panier
- ✅ Rediriger vers Stripe pour le paiement
- ✅ Créer des commandes dans Shopify après paiement

---

## 📚 Liens Utiles

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Shopify Admin** : https://jjfyne-1b.myshopify.com/admin
- **Stripe Dashboard** : https://dashboard.stripe.com

---

**Une fois les variables configurées, votre site sera 100% fonctionnel ! 🚀**

