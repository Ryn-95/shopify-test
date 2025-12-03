# 🔍 Debug Collections - Pourquoi ma collection n'apparaît pas ?

## ✅ Vérifications à faire dans Shopify Admin

### 1. **La collection est-elle PUBLIÉE ?**

1. Allez dans **Shopify Admin** → **Produits** → **Collections**
2. Cliquez sur votre collection
3. Vérifiez la section **"Visibilité"** ou **"Availability"**
4. **Assurez-vous que** :
   - ✅ La collection est **"Publiée"** (Published)
   - ✅ Elle est disponible sur **"Boutique en ligne"** (Online store)

### 2. **La collection contient-elle des produits ?**

1. Dans votre collection, vérifiez l'onglet **"Produits"**
2. **Ajoutez des produits** à la collection si elle est vide
3. Les produits doivent aussi être **publiés** et **disponibles à la vente**

### 3. **Type de collection**

Il existe 2 types de collections dans Shopify :
- **Collections automatiques** : Basées sur des conditions (tags, prix, etc.)
- **Collections manuelles** : Produits ajoutés manuellement

**Les deux types fonctionnent**, mais vérifiez que les conditions sont remplies pour les collections automatiques.

---

## 🧪 Test Direct

J'ai créé un script de test qui vérifie si vos collections sont accessibles via l'API.

**Résultat du test** :
- ✅ **2 collections trouvées** :
  1. "Page d'accueil" (frontpage) - Collection automatique Shopify
  2. "collection test" - Votre collection

**Vos collections SONT accessibles via l'API !**

---

## 🔧 Solutions

### Solution 1 : Vérifier la publication

1. **Shopify Admin** → **Produits** → **Collections**
2. Cliquez sur **"collection test"**
3. Vérifiez que **"Boutique en ligne"** est coché
4. Cliquez sur **"Enregistrer"**

### Solution 2 : Ajouter des produits

1. Dans votre collection, cliquez sur **"Ajouter des produits"**
2. Sélectionnez vos produits
3. Cliquez sur **"Ajouter"**

### Solution 3 : Vérifier sur le site

1. Allez sur : `http://localhost:3000/collections`
2. Vous devriez voir **"collection test"**
3. Cliquez dessus pour voir : `http://localhost:3000/collections/collection-test`

---

## 📝 Collections Trouvées

D'après le test, ces collections sont disponibles :

1. **"Page d'accueil"** (frontpage)
   - Handle : `frontpage`
   - URL : `/collections/frontpage`
   - C'est la collection automatique de Shopify pour la page d'accueil

2. **"collection test"**
   - Handle : `collection-test`
   - URL : `/collections/collection-test`
   - C'est votre collection personnalisée

---

## ✅ Vérification Finale

1. **Allez sur** : `http://localhost:3000/collections`
2. **Vous devriez voir** vos 2 collections
3. **Si vous ne les voyez pas** :
   - Videz le cache du navigateur (Cmd+Shift+R)
   - Vérifiez la console du navigateur pour les erreurs
   - Vérifiez les logs du serveur

---

## 🎯 Prochaines Étapes

Si votre collection n'apparaît toujours pas :

1. **Vérifiez dans Shopify** que la collection est bien publiée
2. **Ajoutez des produits** à la collection
3. **Rechargez la page** `/collections` sur votre site
4. **Vérifiez les logs** du serveur pour voir s'il y a des erreurs

Votre collection **"collection test"** devrait être visible maintenant ! 🎉

