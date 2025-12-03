/**
 * Script pour vérifier les paniers créés dans Shopify
 */

require('dotenv').config({ path: '.env.local' });

console.log('🔍 GUIDE POUR VOIR VOS PANIERS DANS SHOPIFY\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📍 OÙ VOIR VOS PANIERS :\n');

console.log('1. Paniers Abandonnés (Abandoned Checkouts)');
console.log('   → Shopify Admin → Commandes → "Panier abandonné"');
console.log('   → URL: https://admin.shopify.com/store/jjfyne-1b/orders/abandoned_checkouts\n');

console.log('2. Analytics - Métriques');
console.log('   → Analyses → Tableau de bord');
console.log('   → Cherchez "Panier" ou "Cart" dans les métriques\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('⚠️  IMPORTANT :\n');
console.log('Les paniers NE SONT PAS visibles dans "Commandes" tant qu\'ils ne sont pas');
console.log('convertis en commandes (checkout complété).\n');

console.log('Pour voir une COMMANDE dans "Commandes" :');
console.log('1. Ajoutez un produit au panier sur votre site');
console.log('2. Cliquez sur "Panier" puis "Passer à la caisse"');
console.log('3. Complétez le checkout (même en mode test)');
console.log('4. Retournez dans Shopify → Commandes');
console.log('5. La commande apparaîtra !\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('💡 POUR VOIR VOS 3 PRODUITS AJOUTÉS AU PANIER :\n');
console.log('→ Allez sur : https://admin.shopify.com/store/jjfyne-1b/orders/abandoned_checkouts');
console.log('→ Vous verrez tous les paniers créés (même non complétés)\n');

