# ⚡ Quick Start : Stripe en 5 minutes

## 🚀 Configuration Rapide

### 1. Créer un compte Stripe (2 min)

1. **Allez sur** : https://stripe.com
2. **Créez un compte** (gratuit, pas besoin de carte bancaire)
3. **Activez le mode test** (déjà activé par défaut)

### 2. Récupérer les clés API (1 min)

1. **Dashboard Stripe** → **Développeurs** → **Clés API**
2. **Copiez** :
   - **Clé publique** : `pk_test_...`
   - **Clé secrète** : `sk_test_...`

### 3. Ajouter dans `.env.local` (1 min)

Ouvrez `.env.local` et ajoutez :

```env
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique_ici
```

### 4. Redémarrer le serveur (1 min)

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

---

## ✅ Test Immédiat

### Tester un paiement

1. **Allez sur** : `http://localhost:3000`
2. **Ajoutez un produit au panier**
3. **Allez au panier** : `/cart`
4. **Cliquez sur "Passer à la caisse"**
5. **Choisissez "Stripe"** (toggle)
6. **Remplissez avec** :
   - Carte : `4242 4242 4242 4242`
   - Date : `12/25`
   - CVC : `123`
   - Code postal : `12345`
7. **Cliquez sur "Payer"**

🎉 **C'est fait !** Le paiement est traité !

---

## 📊 Vérifier

### Dans Stripe Dashboard

1. **Allez sur** : https://dashboard.stripe.com/test/payments
2. **Vous devriez voir** votre paiement de test !

---

## 🎯 C'est tout !

En **5 minutes**, Stripe est intégré et fonctionnel ! 🚀

**Besoin d'aide ?** Consultez `GUIDE-STRIPE.md` pour plus de détails.

