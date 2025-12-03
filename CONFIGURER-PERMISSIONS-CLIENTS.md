# 🔧 Configuration des Permissions pour Créer des Comptes

## ❌ Problème détecté

Le test montre que la permission `write_customers` n'est pas activée dans votre application Shopify Admin API.

**Erreur** : `This action requires merchant approval for write_customers scope.`

---

## ✅ Solution : Activer les permissions

### Étape 1 : Aller dans Shopify Admin

1. **Connectez-vous** à votre Shopify Admin
2. **Allez dans** : **Paramètres** → **Applications et canaux de vente** → **Développement d'applications**
3. **Cliquez sur votre application** : "Admin API pour paniers" (ou le nom de votre app)

### Étape 2 : Configurer les permissions

1. **Cliquez sur l'onglet "Configuration"** (ou "Configure")
2. **Cherchez la section "Intégration Admin API"**
3. **Cliquez sur "Configurer les scopes Admin API"** (ou "Configure Admin API scopes")

### Étape 3 : Activer les permissions clients

Dans la liste des permissions, **cherchez et cochez** :

✅ **`write_customers`**
   - Description : Créer et modifier des clients
   - **OBLIGATOIRE pour créer des comptes !**

✅ **`read_customers`**
   - Description : Lire les informations des clients
   - **OBLIGATOIRE pour la connexion !**

### Étape 4 : Enregistrer

1. **Cliquez sur "Enregistrer"** (ou "Save")
2. **Vous serez peut-être redirigé** vers une page de confirmation
3. **Confirmez** l'activation des permissions

### Étape 5 : Réinstaller l'application (si nécessaire)

1. **Retournez à l'onglet "Aperçu"** (Overview)
2. Si vous voyez un bouton **"Réinstaller l'application"**, cliquez dessus
3. **Confirmez** la réinstallation

---

## 🧪 Vérification

### Test rapide

Une fois les permissions activées, testez avec :

```bash
node test-create-customer.js
```

**Résultat attendu** :
```
✅ Client créé avec succès !
   ID: 123456789
   Email: test-xxx@example.com
```

### Test sur le site

1. **Allez sur** : `http://localhost:3000/login`
2. **Cliquez sur "Inscription"**
3. **Remplissez le formulaire**
4. **Cliquez sur "Créer un compte"**

**Résultat attendu** :
- ✅ Message : "Inscription réussie !"
- ✅ Redirection vers `/account`
- ✅ Votre profil s'affiche

---

## 📋 Permissions nécessaires (résumé)

Pour que la création de compte fonctionne, vous devez activer :

- ✅ **`write_customers`** ← **OBLIGATOIRE**
- ✅ **`read_customers`** ← **OBLIGATOIRE**

**Note** : Vous avez déjà probablement activé :
- ✅ `write_draft_orders` (pour les paniers)
- ✅ `read_draft_orders`
- ✅ `read_orders`

Il suffit d'ajouter les permissions clients !

---

## 🎯 Où trouver les permissions

**Chemin complet** :
1. Shopify Admin
2. Paramètres (⚙️ en bas à gauche)
3. Applications et canaux de vente
4. Développement d'applications
5. Votre application ("Admin API pour paniers")
6. Configuration
7. Intégration Admin API
8. Configurer les scopes Admin API

---

## ✅ Après configuration

Une fois les permissions activées :

1. ✅ **Redémarrez votre serveur** (si nécessaire) :
   ```bash
   # Arrêtez avec Ctrl+C
   npm run dev
   ```

2. ✅ **Testez la création de compte** sur votre site

3. ✅ **Vérifiez dans Shopify** :
   - Shopify Admin → Clients
   - Vous devriez voir les nouveaux comptes créés

---

## 🐛 Si ça ne fonctionne toujours pas

1. **Vérifiez les logs** dans le terminal du serveur
2. **Vérifiez la console du navigateur** (F12)
3. **Vérifiez que le token Admin API est toujours valide**
4. **Réinstallez l'application** dans Shopify si nécessaire

---

## 🎉 C'est tout !

Une fois les permissions activées, la création de compte fonctionnera parfaitement ! 🚀

