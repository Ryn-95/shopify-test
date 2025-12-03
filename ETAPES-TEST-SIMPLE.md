# 🎯 Test Simple - Étapes Rapides

## ✅ Vous avez déjà Stripe configuré !

Puisque vous avez réussi un paiement dans Stripe Dashboard, voici comment tester sur votre site :

---

## 🚀 Test en 3 Étapes

### 1️⃣ Ajouter au Panier

1. Ouvrez : `http://localhost:3000`
2. Cliquez sur "Ajouter au panier" sur un produit
3. Vérifiez le compteur de panier (en haut à droite)

### 2️⃣ Aller au Checkout

1. Cliquez sur "Panier" → "Passer à la caisse"
2. OU directement : `http://localhost:3000/checkout`
3. Assurez-vous que "Stripe" est sélectionné (toggle en haut)

### 3️⃣ Payer avec Carte de Test

**Remplissez avec** :
- **Carte** : `4242 4242 4242 4242`
- **Date** : `12/26`
- **CVC** : `123`
- **Code postal** : `12345`

**Cliquez sur "Payer"**

---

## ✅ Résultat Attendu

- ✅ Message "Paiement réussi !"
- ✅ Redirection vers `/checkout/success`
- ✅ Paiement visible dans Stripe Dashboard
- ✅ Commande créée dans Shopify (si webhook configuré)

---

## 🔍 Vérifier

### Dans Stripe
- Dashboard → Paiements → Vous devriez voir le nouveau paiement

### Dans Shopify
- Admin → Commandes → Nouvelle commande créée

---

## 🐛 Si ça ne marche pas

1. **Vérifiez que le serveur tourne** : `npm run dev`
2. **Vérifiez les variables** dans `.env.local`
3. **Regardez les logs** dans le terminal
4. **Ouvrez la console** du navigateur (F12)

---

C'est tout ! Testez maintenant 🚀

