# 📝 Guide : Créer un Compte Client

## ✅ Comment créer un compte fonctionnel

### Méthode 1 : Via votre site (Recommandé)

1. **Allez sur** : `http://localhost:3000/login`
2. **Cliquez sur l'onglet "Inscription"**
3. **Remplissez le formulaire** :
   - Email : votre email
   - Prénom (optionnel)
   - Nom (optionnel)
4. **Cliquez sur "Créer un compte"**

✅ **Votre compte sera créé dans Shopify et vous serez automatiquement connecté !**

---

### Méthode 2 : Via Shopify Admin (Alternative)

Si vous préférez créer le compte directement dans Shopify :

1. **Shopify Admin** → **Clients** → **Ajouter un client**
2. **Remplissez les informations** :
   - Email
   - Prénom
   - Nom
3. **Cochez "Envoyer un email de bienvenue"** (optionnel)
4. **Cliquez sur "Enregistrer"**

Ensuite, vous pouvez vous connecter sur votre site avec cet email.

---

## ⚙️ Configuration Requise

### Vérifier les permissions Shopify Admin API

Pour que la création de compte fonctionne, vous devez avoir configuré :

1. **Permissions Admin API** :
   - ✅ `write_customers` - Créer des clients
   - ✅ `read_customers` - Lire les clients

2. **Variables d'environnement** dans `.env.local` :
   ```env
   SHOPIFY_ADMIN_API_ACCESS_TOKEN=votre-token-shpat-ici
   SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
   ```

---

## 🔍 Vérification

### Test de création de compte

1. **Allez sur** : `http://localhost:3000/login`
2. **Cliquez sur "Inscription"**
3. **Entrez un email** (ex: `test@example.com`)
4. **Cliquez sur "Créer un compte"**

### Résultat attendu :

✅ **Message de succès** : "Inscription réussie !"
✅ **Redirection** vers `/account`
✅ **Votre profil** s'affiche avec vos informations

### Vérifier dans Shopify :

1. **Shopify Admin** → **Clients**
2. **Recherchez votre email**
3. **Vous devriez voir le nouveau client créé !**

---

## 🐛 Problèmes Courants

### Erreur : "Admin API non configurée"

**Solution** :
1. Vérifiez que `SHOPIFY_ADMIN_API_ACCESS_TOKEN` est dans `.env.local`
2. Redémarrez le serveur : `npm run dev`

### Erreur : "Un compte existe déjà avec cet email"

**Solution** :
- Utilisez un autre email
- Ou connectez-vous avec l'email existant

### Erreur : "Erreur lors de la création du client"

**Solution** :
1. Vérifiez les permissions Admin API dans Shopify
2. Vérifiez que le token Admin API est valide
3. Regardez les logs dans la console du serveur

---

## 🔐 Authentification Actuelle

### Comment ça fonctionne :

1. **Inscription** : Crée un client dans Shopify (sans mot de passe pour l'instant)
2. **Connexion** : Vérifie que le client existe dans Shopify (par email)
3. **Session** : Stockée dans localStorage

### ⚠️ Note importante :

Pour l'instant, le système fonctionne **sans mot de passe** car :
- Shopify Admin API ne permet pas de créer des clients avec mot de passe directement
- Pour une authentification complète avec mot de passe, il faudrait utiliser **Shopify Customer Account API** (plus complexe)

### ✅ Ce qui fonctionne :

- ✅ Création de compte
- ✅ Connexion par email
- ✅ Gestion du profil
- ✅ Historique des commandes
- ✅ Session persistante

---

## 🚀 Prochaines Étapes

Une fois votre compte créé, vous pouvez :

1. **Voir votre profil** : `/account`
2. **Voir vos commandes** : `/account` → Onglet "Commandes"
3. **Modifier votre profil** : `/account` → Cliquez sur "Modifier mon profil"
4. **Ajouter aux favoris** : Cliquez sur ❤️ sur n'importe quel produit
5. **Comparer des produits** : Cliquez sur 📊 sur les produits

---

## 💡 Astuce

Pour tester rapidement :
1. Créez un compte avec votre email
2. Vérifiez dans Shopify Admin → Clients que le compte est créé
3. Déconnectez-vous et reconnectez-vous pour tester la connexion

Tout est prêt ! 🎉

