# 🛍️ Shopify Next.js Storefront - Boutique E-commerce

Projet Next.js moderne connecté à la Shopify Storefront API, avec gestion complète des produits, du panier et du checkout.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Fonctionnalités détaillées](#fonctionnalités-détaillées)
- [SEO et Performance](#seo-et-performance)
- [Personnalisation](#personnalisation)

## ✨ Fonctionnalités

- ✅ **Affichage des produits** depuis Shopify Storefront API
- ✅ **Page produit détaillée** avec images et descriptions
- ✅ **Gestion des variantes** (taille, couleur, etc.)
- ✅ **Panier fonctionnel** avec ajout/suppression/modification de quantités
- ✅ **Checkout Shopify** intégré avec redirection vers la caisse
- ✅ **Design minimaliste** et responsive (mobile + desktop)
- ✅ **Optimisation SEO** complète (metadata, Open Graph, JSON-LD)
- ✅ **Performance optimisée** avec Next.js 14 App Router
- ✅ **TypeScript** pour la sécurité des types
- ✅ **Persistance du panier** dans localStorage

## 📦 Prérequis

- Node.js 18+ et npm/yarn
- Compte Shopify avec Storefront API activée
- Storefront Access Token

## 🚀 Installation

1. **Cloner ou télécharger le projet**

```bash
cd shopify-nextjs-store
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**

Créez ou modifiez le fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=e8e1e98f531a32d86c9925a633789056
```

**Important** : Remplacez ces valeurs par vos propres credentials Shopify.

## ⚙️ Configuration

### Variables d'environnement

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` : Votre domaine Shopify (ex: `votre-boutique.myshopify.com`)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` : Votre token d'accès Storefront API

### Obtenir un Storefront Access Token

1. Connectez-vous à votre admin Shopify
2. Allez dans **Paramètres** > **Applications et sources de données de vente**
3. Cliquez sur **Développer des applications**
4. Créez une nouvelle application
5. Activez les permissions **Storefront API**
6. Installez l'application et copiez le **Storefront API access token**

## 🎯 Lancement

### Mode développement

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm start
# ou
yarn build
yarn start
```

## 📁 Structure du projet

```
shopify-nextjs-store/
├── app/                          # Pages Next.js App Router
│   ├── layout.tsx                # Layout racine avec metadata SEO
│   ├── page.tsx                  # Page d'accueil (liste produits)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx          # Page produit détaillée
│   ├── cart/
│   │   └── page.tsx              # Page panier
│   └── globals.css                # Styles globaux
├── components/                    # Composants React
│   ├── Layout.tsx                # Layout avec Navbar et Footer
│   ├── Navbar.tsx                # Barre de navigation
│   ├── Footer.tsx                # Footer
│   ├── ProductCard.tsx           # Carte produit pour la liste
│   ├── CartItem.tsx              # Item du panier
│   └── ProductVariantSelector.tsx # Sélecteur de variantes
├── context/
│   └── CartContext.tsx           # Context API pour le panier
├── lib/
│   ├── shopify.ts                # Client Shopify Storefront API
│   └── types.ts                  # Types TypeScript
├── .env.local                    # Variables d'environnement (non versionné)
├── package.json                  # Dépendances npm
├── tsconfig.json                 # Configuration TypeScript
├── tailwind.config.ts            # Configuration Tailwind CSS
├── next.config.js                # Configuration Next.js
└── README.md                     # Documentation
```

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **shopify-buy** - SDK officiel Shopify Storefront API
- **Next.js Image** - Optimisation d'images
- **Context API** - Gestion d'état pour le panier

## 🎨 Fonctionnalités détaillées

### Récupération des produits

Les produits sont récupérés depuis Shopify via `getAllProducts()` dans `lib/shopify.ts`. La fonction utilise `client.product.fetchAll()` du SDK shopify-buy.

### Gestion du panier

Le panier est géré via le `CartContext` qui :
- Crée un checkout Shopify lors du premier ajout
- Sauvegarde le checkoutId dans localStorage
- Synchronise les modifications avec l'API Shopify
- Calcule automatiquement les totaux

### Checkout

Lorsque l'utilisateur clique sur "Passer à la caisse", il est redirigé vers `cart.webUrl`, qui est l'URL du checkout Shopify sécurisé.

### Gestion des variantes

Sur la page produit, si le produit a plusieurs variantes (options), un sélecteur permet de choisir la variante avant d'ajouter au panier.

## 🔍 SEO et Performance

### Optimisations SEO

- **Metadata dynamique** : Chaque page a ses propres metadata (title, description)
- **Open Graph** : Tags OG pour le partage sur les réseaux sociaux
- **Structured Data** : JSON-LD Schema.org pour les produits
- **URLs SEO-friendly** : `/product/[id]` pour les produits

### Optimisations Performance

- **Server Components** : Pages rendues côté serveur pour un chargement rapide
- **Image Optimization** : Utilisation de `next/image` pour optimiser les images
- **Code Splitting** : Automatique avec Next.js
- **Lazy Loading** : Images chargées à la demande

## 🎨 Personnalisation

### Modifier les styles

Les styles sont gérés par Tailwind CSS. Modifiez `tailwind.config.ts` pour personnaliser les couleurs, polices, etc.

### Modifier le design

- **Couleurs** : Modifiez la palette dans `tailwind.config.ts`
- **Layout** : Modifiez `components/Layout.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`
- **Cartes produits** : Modifiez `components/ProductCard.tsx`

### Ajouter des fonctionnalités

- **Notifications** : Ajoutez une bibliothèque de toast (ex: react-hot-toast)
- **Recherche** : Implémentez une recherche de produits
- **Filtres** : Ajoutez des filtres par catégorie, prix, etc.
- **Wishlist** : Ajoutez une liste de souhaits

## 🐛 Dépannage

### Les produits ne s'affichent pas

1. Vérifiez que vos variables d'environnement sont correctes dans `.env.local`
2. Vérifiez que votre Storefront Access Token a les bonnes permissions
3. Vérifiez la console du navigateur pour les erreurs

### Le panier ne fonctionne pas

1. Vérifiez que le localStorage est activé dans votre navigateur
2. Vérifiez les logs dans la console pour les erreurs API
3. Vérifiez que le checkoutId est bien sauvegardé dans localStorage

### Erreurs TypeScript

1. Vérifiez que toutes les dépendances sont installées : `npm install`
2. Vérifiez que `tsconfig.json` est correctement configuré
3. Redémarrez votre serveur de développement

## 📝 Notes importantes

- Le panier est sauvegardé dans le localStorage du navigateur
- Le checkout se fait sur les serveurs Shopify (sécurisé)
- Les images sont hébergées sur Shopify CDN
- Le projet utilise uniquement la Storefront API (pas de Shopify Theme)

## 📄 Licence

Ce projet est fourni tel quel pour usage personnel ou commercial.

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez la documentation Shopify Storefront API
2. Consultez la documentation Next.js
3. Vérifiez les logs dans la console du navigateur

---

**Bon développement ! 🚀**

