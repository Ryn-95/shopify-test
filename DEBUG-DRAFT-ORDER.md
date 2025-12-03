# 🔍 Guide de débogage - Draft Orders

## Problème : La Draft Order ne se met pas à jour

### Étapes de vérification

1. **Ouvrez la console du navigateur** (F12 ou Cmd+Option+I)
2. **Allez sur l'onglet "Console"**
3. **Ajoutez un produit au panier**
4. **Regardez les messages dans la console**

### Messages attendus

#### ✅ Si tout fonctionne :
```
📦 Ajout au panier existant...
✅ Produit ajouté au panier: 2 article(s)
🔍 Draft Order ID sauvegardé: 1574358745463
📦 Articles dans le panier: 2
📝 Mise à jour de la Draft Order 1574358745463...
📝 Mise à jour de la Draft Order 1574358745463...
   Articles à mettre à jour: 2
   - Variant ID: gid://shopify/ProductVariant/56296306803063 → 56296306803063 (quantité: 1)
   - Variant ID: gid://shopify/ProductVariant/56296306803063 → 56296306803063 (quantité: 1)
   Envoi de la requête PUT...
   Status: 200 OK
✅ Draft Order mise à jour: 1574358745463
   Nombre d'articles: 1
   Total: 20.00 EUR
✅ Draft Order mise à jour avec succès!
```

#### ❌ Si le Draft Order ID n'est pas sauvegardé :
```
🔍 Draft Order ID sauvegardé: Aucun
📝 Création d'une nouvelle Draft Order...
```

**Solution** : Videz le localStorage et réessayez :
```javascript
localStorage.removeItem('shopify_draft_order_id')
localStorage.removeItem('shopify_cart_id')
```

#### ❌ Si erreur API :
```
❌ Erreur lors de la mise à jour de la Draft Order:
   Réponse: {"errors": "..."}
```

**Solution** : Vérifiez que le token Admin API est correct dans `.env.local`

### Vérification manuelle du localStorage

Dans la console du navigateur, tapez :
```javascript
// Vérifier le Draft Order ID
localStorage.getItem('shopify_draft_order_id')

// Vérifier le Cart ID
localStorage.getItem('shopify_cart_id')

// Voir toutes les clés
Object.keys(localStorage)
```

### Test rapide

1. **Videz le panier** sur votre site
2. **Videz le localStorage** :
   ```javascript
   localStorage.clear()
   ```
3. **Rechargez la page** (F5)
4. **Ajoutez un produit** → Une nouvelle Draft Order devrait être créée
5. **Ajoutez le même produit à nouveau** → La Draft Order devrait être mise à jour avec quantité 2

### Si le problème persiste

1. **Vérifiez les logs du serveur** :
   ```bash
   tail -f /tmp/nextjs-output.log | grep -i "draft\|error"
   ```

2. **Vérifiez que le token Admin API est présent** :
   ```bash
   grep SHOPIFY_ADMIN_API_ACCESS_TOKEN .env.local
   ```

3. **Redémarrez le serveur** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   npm run dev
   ```

## Notes importantes

- Le panier GraphQL **fusionne automatiquement** les produits identiques
- Si vous ajoutez le même produit 2 fois, le panier aura **1 ligne avec quantité 2**
- La Draft Order devrait refléter cela avec **1 ligne avec quantité 2**

