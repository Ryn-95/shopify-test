# 🚀 PROMPT COMPLET POUR CRÉER UN SITE E-COMMERCE SHOPIFY

## 📋 INSTRUCTIONS GÉNÉRALES

Crée un site e-commerce complet avec Next.js 14, TypeScript, Tailwind CSS, intégration Shopify Storefront API + Admin API, et Stripe pour les paiements. Le site doit avoir un design minimaliste style Apple/Tesla avec toutes les fonctionnalités e-commerce essentielles.

---

## 🎯 ARCHITECTURE TECHNIQUE

### **Stack Technologique**
- **Framework** : Next.js 14 avec App Router
- **Langage** : TypeScript strict
- **Styling** : Tailwind CSS 3.4+
- **E-commerce Backend** : Shopify Storefront API (GraphQL) + Admin API (REST)
- **Paiement** : Stripe (Checkout Sessions)
- **State Management** : React Context API
- **Storage** : localStorage pour panier, auth, wishlist
- **Images** : Next.js Image Optimization + Unsplash pour images décoratives

### **Dépendances Principales**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.5.3",
    "stripe": "^20.0.0",
    "shopify-buy": "^2.17.0",
    "node-fetch": "^2.7.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## 🎨 DESIGN & UX

### **Style Visuel**
- Design minimaliste inspiré Apple/Tesla
- Typographie : SF Pro Display, Inter, système
- Palette de couleurs tech premium :
  - Noir : `#000000`
  - Gris foncé : `#1d1d1f`
  - Gris moyen : `#86868b`
  - Gris clair : `#f5f5f7`
  - Blanc : `#ffffff`
  - Accent bleu : `#0071e3`
- Espacements généreux, bordures arrondies (12px, 16px, 24px)
- Ombres douces et subtiles
- Animations fluides (fade-in, slide-up, hover effects)

### **Responsive Design**
- Mobile-first approach
- Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)
- Navigation mobile avec menu hamburger
- Images adaptatives avec Next.js Image

### **Composants UI**
- Cards avec hover effects
- Boutons avec transitions smooth
- Loading skeletons
- Toast notifications
- Modals pour comparaison/wishlist
- Breadcrumbs navigation
- Search bar avec autocomplete

---

## 📂 STRUCTURE DU PROJET

### **Arborescence Complète**
```
project-root/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── customer/
│   │   │   ├── [id]/
│   │   │   │   ├── route.ts
│   │   │   │   └── orders/route.ts
│   │   │   └── update/route.ts
│   │   ├── draft-order/route.ts
│   │   ├── newsletter/subscribe/route.ts
│   │   ├── shopify/
│   │   │   ├── cart/route.ts
│   │   │   ├── create-order/route.ts
│   │   │   └── create-order-from-session/route.ts
│   │   ├── stripe/
│   │   │   ├── create-checkout-session/route.ts
│   │   │   ├── create-payment-intent/route.ts
│   │   │   └── webhook/route.ts
│   │   └── webhooks/route.ts
│   ├── account/page.tsx
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── page.tsx
│   ├── cart/page.tsx
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── collections/
│   │   ├── [handle]/page.tsx
│   │   └── page.tsx
│   ├── compare/page.tsx
│   ├── contact/page.tsx
│   ├── login/page.tsx
│   ├── newsletter/page.tsx
│   ├── product/[handle]/page.tsx
│   ├── products/page.tsx
│   ├── search/page.tsx
│   ├── wishlist/page.tsx
│   ├── about/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── global-error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── BannerSection.tsx
│   ├── Breadcrumbs.tsx
│   ├── CartItem.tsx
│   ├── CTASection.tsx
│   ├── ErrorBoundary.tsx
│   ├── FeaturedProducts.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ImageGallery.tsx
│   ├── ImageHero.tsx
│   ├── Layout.tsx
│   ├── LoadingSkeleton.tsx
│   ├── Navbar.tsx
│   ├── NetworkError.tsx
│   ├── NewsletterSection.tsx
│   ├── ProductCard.tsx
│   ├── ProductFilters.tsx
│   ├── ProductRecommendations.tsx
│   ├── ProductReviews.tsx
│   ├── ProductShowcase.tsx
│   ├── ProductsProvider.tsx
│   ├── ProductVariantSelector.tsx
│   ├── SearchBar.tsx
│   ├── StatsSection.tsx
│   ├── StripeCheckout.tsx
│   ├── Testimonials.tsx
│   ├── Toast.tsx
│   ├── ToastProvider.tsx
│   ├── VideoSection.tsx
│   └── WhyChooseUs.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── CompareContext.tsx
│   └── WishlistContext.tsx
├── lib/
│   ├── analytics.ts
│   ├── notifications.ts
│   ├── reviews.ts
│   ├── shopify.ts
│   ├── shopify-admin.ts
│   ├── shopify-analytics.ts
│   ├── shopify-collections.ts
│   ├── shopify-collections-admin.ts
│   ├── shopify-customers.ts
│   ├── shopify-metafields.ts
│   ├── shopify-orders.ts
│   ├── stripe.ts
│   └── types.ts
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🛍️ FONCTIONNALITÉS E-COMMERCE À IMPLÉMENTER

### **1. GESTION DES PRODUITS**

#### **Affichage des Produits**
- Page d'accueil avec tous les produits
- Page `/products` avec liste complète
- Page `/product/[handle]` pour chaque produit
- Affichage depuis Shopify Storefront API (GraphQL)
- Requête GraphQL pour récupérer :
  - ID, titre, description, handle
  - Images multiples (URL, alt text)
  - Variantes (ID, titre, prix, stock)
  - Options (taille, couleur, etc.)
  - Prix comparatifs (compareAtPrice)
  - Disponibilité (availableForSale)
  - Price range

#### **Composants Produits**
- `ProductCard.tsx` : Carte produit avec image, titre, prix, bouton "Ajouter au panier"
- `ProductVariantSelector.tsx` : Sélecteur de variantes (taille, couleur, etc.)
- `ProductShowcase.tsx` : Section produits phares sur homepage
- `FeaturedProducts.tsx` : Produits mis en avant
- `ProductRecommendations.tsx` : Produits similaires suggérés
- `ProductReviews.tsx` : Système d'avis clients

#### **SEO Produits**
- Metadata dynamique par produit
- JSON-LD structured data (schema.org/Product)
- Open Graph tags
- URLs propres avec handle

### **2. GESTION DU PANIER**

#### **Fonctionnalités Panier**
- Ajout de produits au panier
- Modification des quantités
- Suppression d'articles
- Persistance dans localStorage
- Synchronisation avec Shopify Cart API (GraphQL)
- Calcul automatique des totaux
- Affichage du nombre d'articles dans navbar
- Page `/cart` avec récapitulatif

#### **Shopify Cart API**
- Création de panier : `cartCreate` mutation
- Ajout d'articles : `cartLinesAdd` mutation
- Mise à jour quantités : `cartLinesUpdate` mutation
- Suppression articles : `cartLinesRemove` mutation
- Récupération panier : `cart` query

#### **Context Panier**
- `CartContext.tsx` avec :
  - État du panier
  - Fonctions addToCart, removeFromCart, updateQuantity
  - Persistance localStorage
  - Synchronisation Shopify

### **3. PAIEMENT STRIPE**

#### **Intégration Stripe**
- Stripe Checkout Sessions (redirection vers Stripe)
- Création de session : `/api/stripe/create-checkout-session`
- Webhook Stripe : `/api/stripe/webhook`
- Page checkout : `/checkout`
- Page succès : `/checkout/success`

#### **Flux de Paiement**
1. Client clique "Payer" sur page checkout
2. Création session Stripe Checkout avec line items
3. Redirection vers Stripe
4. Paiement sur Stripe
5. Webhook `checkout.session.completed` reçu
6. Création automatique commande Shopify
7. Redirection vers page succès

#### **Création Commande Shopify**
- Après paiement Stripe réussi
- Récupération session Stripe avec line items
- Extraction variant IDs depuis metadata
- Création commande via Admin API REST
- Association client si connecté

### **4. COMPTES CLIENTS**

#### **Authentification**
- Inscription : `/api/auth/register`
- Connexion : `/api/auth/login`
- Page login : `/login`
- Page compte : `/account`
- Authentification JWT
- Persistance session localStorage

#### **Gestion Clients Shopify**
- Création client dans Shopify lors inscription
- Recherche client par email
- Mise à jour profil
- Historique commandes
- Statistiques client (total dépensé, nombre commandes)

#### **Context Auth**
- `AuthContext.tsx` avec :
  - État utilisateur connecté
  - Fonctions login, register, logout
  - Récupération profil
  - Persistance token

### **5. COLLECTIONS**

#### **Affichage Collections**
- Page `/collections` avec toutes les collections
- Page `/collections/[handle]` avec produits de la collection
- Récupération depuis Storefront API
- Comptage produits par collection
- Images de collection
- Descriptions collections

#### **Filtrage**
- Filtrage produits par collection
- Tri produits (prix, nom, date)
- Recherche dans collections

### **6. RECHERCHE**

#### **Fonctionnalités Recherche**
- Barre de recherche dans navbar
- Page `/search` avec résultats
- Recherche client-side (filtrage produits)
- Highlight résultats
- Suggestions de recherche

### **7. FONCTIONNALITÉS AVANCÉES**

#### **Wishlist/Favoris**
- Ajout produits aux favoris
- Page `/wishlist` avec produits sauvegardés
- Persistance localStorage
- `WishlistContext.tsx` pour gestion état

#### **Comparaison Produits**
- Comparer jusqu'à 4 produits
- Page `/compare` avec tableau comparatif
- `CompareContext.tsx` pour gestion état
- Affichage différences (prix, caractéristiques)

#### **Avis Clients**
- Système de reviews produits
- Affichage notes (étoiles)
- Commentaires clients
- Persistance reviews (localStorage ou API)

#### **Recommandations**
- Produits similaires suggérés
- Basé sur collection ou tags
- Affichage sur page produit

#### **Newsletter**
- Inscription newsletter
- Page `/newsletter`
- Section newsletter homepage
- API route `/api/newsletter/subscribe`

#### **Analytics**
- Statistiques ventes
- Top produits vendus
- Ventes par période
- Analytics par produit
- Dashboard admin `/admin/dashboard`

### **8. PAGES STATIQUES**

#### **Pages à Créer**
- `/about` : À propos
- `/contact` : Contact
- Page 404 personnalisée
- Page erreur globale
- Page loading

---

## 🔌 INTÉGRATIONS SHOPIFY

### **Storefront API (GraphQL)**

#### **Endpoint**
```
https://{store-domain}/api/2023-10/graphql.json
```

#### **Headers**
```
Content-Type: application/json
X-Shopify-Storefront-Access-Token: {token}
```

#### **Queries Principales**
- `products` : Récupérer tous les produits
- `product(handle: $handle)` : Récupérer un produit
- `collections` : Récupérer toutes les collections
- `collection(handle: $handle)` : Récupérer une collection
- `cart(id: $id)` : Récupérer un panier

#### **Mutations Principales**
- `cartCreate` : Créer un panier
- `cartLinesAdd` : Ajouter au panier
- `cartLinesUpdate` : Mettre à jour panier
- `cartLinesRemove` : Supprimer du panier

### **Admin API (REST)**

#### **Endpoint**
```
https://{store-domain}/admin/api/2024-01/{resource}.json
```

#### **Headers**
```
X-Shopify-Access-Token: {admin-token}
Content-Type: application/json
```

#### **Ressources Utilisées**
- `/customers.json` : Gestion clients
- `/orders.json` : Gestion commandes
- `/draft_orders.json` : Draft orders
- `/products/{id}/metafields.json` : Metafields

### **Fichiers Librairies Shopify**

#### **lib/shopify.ts**
- `getAllProducts()` : Récupérer tous produits
- `getProductByHandle(handle)` : Récupérer un produit
- `createCheckout()` : Créer panier
- `addItemToCheckout(cartId, variantId, quantity)` : Ajouter au panier
- `updateCheckoutLineItem(cartId, lineItemId, quantity)` : Mettre à jour
- `removeCheckoutLineItem(cartId, lineItemId)` : Supprimer
- `getCheckout(cartId)` : Récupérer panier

#### **lib/shopify-collections.ts**
- `getAllCollections()` : Toutes collections
- `getCollectionByHandle(handle)` : Une collection
- `getCollectionProducts(handle, first)` : Produits collection

#### **lib/shopify-customers.ts**
- `createCustomer(data)` : Créer client
- `getCustomerByEmail(email)` : Rechercher client
- `updateCustomer(id, updates)` : Mettre à jour
- `getCustomerOrders(id)` : Commandes client

#### **lib/shopify-orders.ts**
- `getAllOrders(limit)` : Toutes commandes
- `getOrderById(id)` : Une commande
- `getOrdersStats()` : Statistiques

#### **lib/shopify-analytics.ts**
- `getShopAnalytics(startDate, endDate)` : Analytics boutique
- `getProductAnalytics(productId)` : Analytics produit

#### **lib/shopify-metafields.ts**
- `getProductMetafields(productId)` : Récupérer metafields
- `setProductMetafield(...)` : Créer/metre à jour metafield

#### **lib/shopify-admin.ts**
- `createDraftOrder(lineItems)` : Créer draft order
- `updateDraftOrder(id, lineItems)` : Mettre à jour

---

## 💳 INTÉGRATION STRIPE

### **Configuration Stripe**
- Clé secrète serveur : `STRIPE_SECRET_KEY`
- Clé publique client : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Webhook secret : `STRIPE_WEBHOOK_SECRET`

### **lib/stripe.ts**
- Initialisation client Stripe
- Configuration avec clé secrète

### **API Routes Stripe**

#### **POST /api/stripe/create-checkout-session**
- Créer session Checkout
- Inclure line items avec metadata (variant_id)
- URLs succès/annulation
- Retourner URL de redirection

#### **POST /api/stripe/webhook**
- Vérifier signature webhook
- Gérer événement `checkout.session.completed`
- Récupérer session complète avec line items
- Créer commande Shopify automatiquement

---

## 🎨 COMPOSANTS À CRÉER

### **Composants Navigation**
- `Navbar.tsx` : Navigation principale avec logo, liens, search, cart, account
- `Footer.tsx` : Footer avec liens, contact, réseaux sociaux
- `Breadcrumbs.tsx` : Fil d'Ariane navigation

### **Composants Produits**
- `ProductCard.tsx` : Carte produit avec image, titre, prix, CTA
- `ProductVariantSelector.tsx` : Sélecteur variantes (radio buttons, dropdowns)
- `ProductShowcase.tsx` : Section produits phares
- `FeaturedProducts.tsx` : Produits mis en avant
- `ProductRecommendations.tsx` : Produits similaires
- `ProductReviews.tsx` : Avis et notes
- `ProductFilters.tsx` : Filtres produits (collection, prix, etc.)

### **Composants Panier**
- `CartItem.tsx` : Item panier avec image, titre, quantité, prix
- Page `/cart` : Liste items, totaux, bouton checkout

### **Composants Checkout**
- Page `/checkout` : Récap commande, bouton "Payer" vers Stripe
- Page `/checkout/success` : Confirmation paiement réussi

### **Composants Homepage**
- `Hero.tsx` : Section hero avec titre, sous-titre, CTA, image background
- `StatsSection.tsx` : Statistiques (clients, produits, pays, support)
- `ImageHero.tsx` : Section image + texte (réversible)
- `BannerSection.tsx` : Bannière avec texte et CTA
- `Features.tsx` : Caractéristiques (qualité, livraison, paiement, support)
- `WhyChooseUs.tsx` : Pourquoi nous choisir
- `Testimonials.tsx` : Témoignages clients
- `VideoSection.tsx` : Section vidéo avec thumbnail
- `ImageGallery.tsx` : Galerie images
- `NewsletterSection.tsx` : Inscription newsletter
- `CTASection.tsx` : Call-to-action final

### **Composants UI**
- `LoadingSkeleton.tsx` : Skeleton loading
- `Toast.tsx` : Toast notification
- `ToastProvider.tsx` : Provider toasts
- `ErrorBoundary.tsx` : Gestion erreurs
- `NetworkError.tsx` : Erreur réseau
- `SearchBar.tsx` : Barre recherche

---

## 🔄 CONTEXTS REACT

### **CartContext.tsx**
```typescript
interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  removeFromCart: (lineItemId: string) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  getCartCount: () => number
  clearCart: () => void
}
```

### **AuthContext.tsx**
```typescript
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: ProfileData) => Promise<void>
}
```

### **WishlistContext.tsx**
```typescript
interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}
```

### **CompareContext.tsx**
```typescript
interface CompareContextType {
  compareItems: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  canAddMore: () => boolean
}
```

---

## 📡 API ROUTES À CRÉER

### **Authentification**
- `POST /api/auth/register` : Inscription, création client Shopify
- `POST /api/auth/login` : Connexion, génération JWT

### **Clients**
- `GET /api/customer/[id]` : Récupérer profil client
- `PUT /api/customer/update` : Mettre à jour profil
- `GET /api/customer/[id]/orders` : Historique commandes

### **Panier**
- `POST /api/draft-order` : Créer draft order Shopify
- `PUT /api/draft-order` : Mettre à jour draft order

### **Shopify**
- `POST /api/shopify/create-order` : Créer commande depuis Stripe
- `POST /api/shopify/create-order-from-session` : Créer depuis session Stripe

### **Stripe**
- `POST /api/stripe/create-checkout-session` : Créer session Checkout
- `POST /api/stripe/webhook` : Webhook Stripe

### **Newsletter**
- `POST /api/newsletter/subscribe` : Inscription newsletter

### **Webhooks**
- `POST /api/webhooks` : Webhooks Shopify (orders/create, products/create, etc.)

---

## 🎨 CONFIGURATION TAILWIND

### **tailwind.config.ts**
- Couleurs tech premium (noir, gris, bleu accent)
- Typographie SF Pro Display, Inter
- Tailles de police (display, headline, title, body, caption)
- Espacements personnalisés
- Bordures arrondies (xl, 2xl, 3xl)
- Ombres (soft, medium, large, glow)
- Animations (fade-in, slide-up, scale-in, glow)

### **globals.css**
- Reset CSS
- Variables CSS
- Animations keyframes
- Styles globaux

---

## 🔐 VARIABLES D'ENVIRONNEMENT

### **.env.local**
```env
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token

# Shopify Admin API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_API_ACCESS_TOKEN=your-admin-token

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:4000

# Shopify Webhook Secret (optionnel)
SHOPIFY_WEBHOOK_SECRET=your-webhook-secret
```

---

## 📝 TYPES TYPESCRIPT

### **lib/types.ts**
```typescript
export interface Product {
  id: string
  title: string
  description: string
  descriptionHtml?: string
  handle: string
  images: ProductImage[]
  variants: ProductVariant[]
  options?: ProductOption[]
  priceRange?: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  availableForSale: boolean
}

export interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  image?: {
    src: string
    alt?: string
  }
}

export interface Cart {
  id: string
  webUrl: string
  lineItems: CartItem[]
  subtotalPrice?: string
  totalPrice?: string
  currencyCode?: string
}

export interface CartItem {
  id: string
  variantId: string
  title: string
  variantTitle: string
  quantity: number
  price: string
  image?: {
    src: string
    alt?: string
  }
}
```

---

## 🚀 INSTRUCTIONS DE DÉVELOPPEMENT

### **Étape 1 : Initialisation**
1. Créer projet Next.js 14 avec TypeScript
2. Installer dépendances (package.json)
3. Configurer Tailwind CSS
4. Créer structure de dossiers

### **Étape 2 : Configuration**
1. Créer `.env.local` avec variables Shopify et Stripe
2. Configurer `next.config.js` pour images (cdn.shopify.com, images.unsplash.com)
3. Configurer `tailwind.config.ts` avec palette couleurs
4. Créer `lib/types.ts` avec types TypeScript

### **Étape 3 : Librairies Shopify**
1. Créer `lib/shopify.ts` avec fonctions Storefront API
2. Créer `lib/shopify-collections.ts`
3. Créer `lib/shopify-customers.ts`
4. Créer `lib/shopify-orders.ts`
5. Créer `lib/shopify-analytics.ts`
6. Créer `lib/shopify-metafields.ts`
7. Créer `lib/shopify-admin.ts`

### **Étape 4 : Stripe**
1. Créer `lib/stripe.ts`
2. Créer `/api/stripe/create-checkout-session/route.ts`
3. Créer `/api/stripe/webhook/route.ts`

### **Étape 5 : Contexts**
1. Créer `context/CartContext.tsx`
2. Créer `context/AuthContext.tsx`
3. Créer `context/WishlistContext.tsx`
4. Créer `context/CompareContext.tsx`

### **Étape 6 : Composants**
1. Créer composants navigation (Navbar, Footer)
2. Créer composants produits (ProductCard, ProductVariantSelector, etc.)
3. Créer composants homepage (Hero, Features, etc.)
4. Créer composants UI (Toast, LoadingSkeleton, etc.)

### **Étape 7 : Pages**
1. Créer `app/page.tsx` (homepage)
2. Créer `app/products/page.tsx`
3. Créer `app/product/[handle]/page.tsx`
4. Créer `app/cart/page.tsx`
5. Créer `app/checkout/page.tsx` et `app/checkout/success/page.tsx`
6. Créer autres pages (collections, account, etc.)

### **Étape 8 : API Routes**
1. Créer routes authentification
2. Créer routes clients
3. Créer routes Stripe
4. Créer routes Shopify
5. Créer routes webhooks

### **Étape 9 : Layout & Providers**
1. Créer `app/layout.tsx` avec tous les providers
2. Configurer metadata SEO
3. Ajouter styles globaux

### **Étape 10 : Tests & Optimisations**
1. Tester flux complet (produit → panier → paiement → commande)
2. Vérifier responsive design
3. Optimiser images
4. Tester erreurs et edge cases

---

## ✅ CHECKLIST FONCTIONNALITÉS

### **Produits**
- [ ] Affichage tous produits
- [ ] Page produit détaillée
- [ ] Sélection variantes
- [ ] Images multiples
- [ ] SEO optimisé

### **Panier**
- [ ] Ajout produits
- [ ] Modification quantités
- [ ] Suppression articles
- [ ] Persistance localStorage
- [ ] Synchronisation Shopify

### **Paiement**
- [ ] Intégration Stripe
- [ ] Création session Checkout
- [ ] Webhook paiement
- [ ] Création commande Shopify
- [ ] Page succès

### **Comptes**
- [ ] Inscription
- [ ] Connexion
- [ ] Profil client
- [ ] Historique commandes
- [ ] Création client Shopify

### **Collections**
- [ ] Affichage collections
- [ ] Page collection
- [ ] Filtrage produits

### **Recherche**
- [ ] Barre recherche
- [ ] Page résultats
- [ ] Filtrage client-side

### **Fonctionnalités Avancées**
- [ ] Wishlist
- [ ] Comparaison produits
- [ ] Avis clients
- [ ] Recommandations
- [ ] Newsletter
- [ ] Analytics

### **Design**
- [ ] Style minimaliste Apple
- [ ] Responsive mobile/tablette/desktop
- [ ] Animations fluides
- [ ] Images Unsplash
- [ ] Loading states
- [ ] Error handling

---

## 🎯 RÉSULTAT ATTENDU

Un site e-commerce complet avec :
- ✅ Catalogue produits Shopify
- ✅ Panier fonctionnel
- ✅ Paiement Stripe
- ✅ Comptes clients
- ✅ Collections et recherche
- ✅ Fonctionnalités avancées (wishlist, comparaison, reviews)
- ✅ Design professionnel et responsive
- ✅ SEO optimisé
- ✅ Prêt pour production

---

## 📚 RESSOURCES

- **Shopify Storefront API** : https://shopify.dev/docs/api/storefront
- **Shopify Admin API** : https://shopify.dev/docs/api/admin
- **Stripe Checkout** : https://stripe.com/docs/payments/checkout
- **Next.js 14** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs

---

**Ce prompt contient TOUT ce qui est nécessaire pour créer un site e-commerce complet avec Shopify et Stripe.**

