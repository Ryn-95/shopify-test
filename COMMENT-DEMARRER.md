# 🚀 Comment Démarrer le Serveur

## ⚠️ Erreur : ERR_CONNECTION_REFUSED

Cette erreur signifie que **le serveur Next.js n'est pas démarré**.

---

## ✅ Solution Simple

### Dans votre Terminal

1. **Ouvrez un terminal** (ou utilisez celui que vous avez déjà)

2. **Assurez-vous d'être dans le bon dossier** :
   ```bash
   cd /Users/rayanemouhajer/shopify-nextjs-store
   ```

3. **Démarrez le serveur** :
   ```bash
   npm run dev
   ```

4. **Attendez** de voir :
   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   ✓ Ready in Xs
   ```

5. **Ouvrez votre navigateur** : `http://localhost:3000`

---

## 🔍 Vérification

### Le serveur fonctionne si :

- ✅ Vous voyez "✓ Ready" dans le terminal
- ✅ Le site s'affiche dans votre navigateur
- ✅ Pas d'erreur "ERR_CONNECTION_REFUSED"

---

## ⚠️ Important

**Gardez le terminal ouvert** pendant que vous utilisez le site.

Si vous fermez le terminal ou appuyez sur `Ctrl+C`, le serveur s'arrête et vous verrez à nouveau "ERR_CONNECTION_REFUSED".

---

## 🐛 Si le Port 3000 est Occupé

Si vous voyez "Port 3000 is already in use" :

```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

Puis ouvrez : `http://localhost:3001`

---

## ✅ Checklist

- [ ] Terminal ouvert
- [ ] Commande `npm run dev` exécutée
- [ ] Message "Ready" affiché
- [ ] Navigateur ouvert sur `http://localhost:3000`

---

**Le serveur est en train de démarrer ! Attendez quelques secondes puis ouvrez `http://localhost:3000`** 🚀

