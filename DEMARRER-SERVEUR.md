# 🚀 Démarrer le Serveur Next.js

## ❌ Erreur : ERR_CONNECTION_REFUSED

Cette erreur signifie que **le serveur Next.js n'est pas démarré**.

---

## ✅ Solution : Démarrer le Serveur

### Dans votre Terminal

1. **Ouvrez un terminal**
2. **Allez dans le projet** :
   ```bash
   cd /Users/rayanemouhajer/shopify-nextjs-store
   ```

3. **Démarrez le serveur** :
   ```bash
   npm run dev
   ```

4. **Attendez** le message :
   ```
   ✓ Ready on http://localhost:3000
   ```

5. **Ouvrez votre navigateur** : `http://localhost:3000`

---

## 🔍 Vérification

### Le serveur est démarré si vous voyez :

```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in Xs
```

---

## 🐛 Si le Port 3000 est Occupé

Si vous voyez "Port 3000 is already in use" :

### Option 1 : Utiliser un autre port

```bash
npm run dev -- -p 3001
```

Puis ouvrez : `http://localhost:3001`

### Option 2 : Libérer le port 3000

```bash
# Trouver le processus sur le port 3000
lsof -ti:3000

# Tuer le processus (remplacez PID par le numéro trouvé)
kill -9 PID
```

Puis redémarrez : `npm run dev`

---

## ✅ Checklist

- [ ] Terminal ouvert
- [ ] Dans le bon dossier (`/Users/rayanemouhajer/shopify-nextjs-store`)
- [ ] Commande `npm run dev` exécutée
- [ ] Message "Ready" affiché
- [ ] Navigateur ouvert sur `http://localhost:3000`

---

## 💡 Astuce

**Gardez le terminal ouvert** pendant que vous utilisez le site. Si vous fermez le terminal, le serveur s'arrête.

---

**Le serveur devrait démarrer maintenant !** 🚀

