# 🧪 Test de Création de Compte

## ✅ Étapes pour tester

### 1. Vérifier la configuration

Assurez-vous que `.env.local` contient :
```env
SHOPIFY_ADMIN_API_ACCESS_TOKEN=shpat_...
SHOPIFY_STORE_DOMAIN=jjfyne-1b.myshopify.com
```

### 2. Démarrer le serveur

```bash
npm run dev
```

### 3. Tester la création de compte

1. **Ouvrez** : `http://localhost:3000/login`
2. **Cliquez sur "Inscription"** (onglet à droite)
3. **Remplissez** :
   - Email : `test@example.com` (ou votre email)
   - Prénom : `Test`
   - Nom : `User`
4. **Cliquez sur "Créer un compte"**

### 4. Résultat attendu

✅ **Succès** :
- Message : "Inscription réussie !"
- Redirection vers `/account`
- Votre profil s'affiche

❌ **Erreur** :
- Vérifiez les logs dans le terminal
- Vérifiez les permissions Shopify Admin API

### 5. Vérifier dans Shopify

1. **Shopify Admin** → **Clients**
2. **Recherchez** votre email
3. **Vérifiez** que le client est créé

---

## 🔍 Debug

### Si ça ne fonctionne pas :

1. **Vérifiez les logs du serveur** :
   ```bash
   # Dans le terminal où tourne npm run dev
   # Vous devriez voir :
   ✅ Nouveau client créé: test@example.com (ID: ...)
   ```

2. **Vérifiez les permissions Shopify** :
   - Shopify Admin → Paramètres → Applications
   - Votre app "Admin API pour paniers"
   - Vérifiez que `write_customers` et `read_customers` sont activées

3. **Testez l'API directement** :
   ```bash
   # Créez un fichier test-create-customer.js
   ```

4. **Vérifiez les erreurs dans la console du navigateur** :
   - Ouvrez les DevTools (F12)
   - Onglet Console
   - Regardez les erreurs éventuelles

---

## 📝 Exemple de test

```javascript
// test-create-customer.js
const fetch = require('node-fetch');

const STORE_DOMAIN = 'jjfyne-1b.myshopify.com';
const ACCESS_TOKEN = 'votre-token-shpat-ici';

async function testCreateCustomer() {
  try {
    const response = await fetch(
      `https://${STORE_DOMAIN}/admin/api/2024-01/customers.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ACCESS_TOKEN,
        },
        body: JSON.stringify({
          customer: {
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
          },
        }),
      }
    );

    const data = await response.json();
    console.log('✅ Client créé:', data.customer);
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

testCreateCustomer();
```

---

## ✅ Checklist

- [ ] Variables d'environnement configurées
- [ ] Serveur démarré (`npm run dev`)
- [ ] Permissions Shopify Admin API activées
- [ ] Test de création de compte effectué
- [ ] Client visible dans Shopify Admin

---

Tout est prêt ! 🚀

