# 🚀 Créer le Nouveau Repo GitHub "shopify-test"

## 📋 Étapes à Suivre

### Étape 1 : Créer le Repo sur GitHub

1. **Allez sur** : https://github.com/new
2. **Nom du repo** : `shopify-test`
3. **Description** : `Boutique e-commerce Next.js avec Shopify et Stripe`
4. **Visibilité** : Public ou Private (selon votre choix)
5. **NE PAS** cocher "Initialize with README" (le repo existe déjà)
6. **Cliquez sur** "Create repository"

### Étape 2 : Copier l'URL du Repo

Après création, GitHub vous donnera une URL comme :
```
https://github.com/VOTRE_USERNAME/shopify-test.git
```

### Étape 3 : Configurer le Remote

Dans votre terminal, exécutez :

```bash
cd /Users/rayanemouhajer/shopify-nextjs-store
git remote add origin https://github.com/VOTRE_USERNAME/shopify-test.git
git push -u origin master
```

---

## ⚡ Alternative : Utiliser GitHub CLI

Si vous avez GitHub CLI installé :

```bash
gh repo create shopify-test --public --source=. --remote=origin --push
```

---

## ✅ Après la Création

Une fois le repo créé, dites-moi votre nom d'utilisateur GitHub et je configurerai le remote automatiquement !

