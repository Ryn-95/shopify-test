# 🔄 Instructions : Redémarrer Proprement

## ⚠️ L'Erreur "Missing Required Error Components"

Cette erreur apparaît quand Next.js ne trouve pas les composants d'erreur requis.

**✅ Les fichiers sont créés** : `error.tsx`, `loading.tsx`, `global-error.tsx`

**Le problème** : Le cache Next.js doit être nettoyé et le serveur redémarré.

---

## 🚀 Solution Rapide

### Option 1 : Script Automatique

```bash
./restart-dev.sh
```

### Option 2 : Manuel

```bash
# 1. Arrêter le serveur (Ctrl+C dans le terminal où il tourne)

# 2. Nettoyer le cache
rm -rf .next

# 3. Redémarrer
npm run dev
```

---

## 🔍 Vérification

### Vérifier que les fichiers existent :

```bash
ls -la app/error.tsx app/loading.tsx app/global-error.tsx
```

**Résultat attendu** : Les 3 fichiers doivent être listés.

---

## ✅ Après Redémarrage

1. **Attendez** : `✓ Ready on http://localhost:3000`
2. **Ouvrez** : `http://localhost:3000`
3. **L'erreur devrait avoir disparu**

---

## 🐛 Si ça Ne Fonctionne Toujours Pas

### Solution Complète :

1. **Fermez complètement** votre terminal
2. **Ouvrez un nouveau terminal**
3. **Allez dans le projet** :
   ```bash
   cd /Users/rayanemouhajer/shopify-nextjs-store
   ```
4. **Nettoyez tout** :
   ```bash
   rm -rf .next
   rm -rf node_modules/.cache
   ```
5. **Redémarrez** :
   ```bash
   npm run dev
   ```

---

## 📋 Checklist

- [ ] Fichiers `error.tsx`, `loading.tsx`, `global-error.tsx` existent dans `app/`
- [ ] Cache `.next` supprimé
- [ ] Serveur arrêté complètement
- [ ] Serveur redémarré avec `npm run dev`
- [ ] Attendu le message "Ready"

---

**Suivez ces étapes et l'erreur disparaîtra !** 🚀

