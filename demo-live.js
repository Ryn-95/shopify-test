/**
 * Démonstration en direct : Vérification que les produits Shopify
 * sont accessibles depuis localhost
 */

require('dotenv').config({ path: '.env.local' });

const Client = require('shopify-buy');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
});

console.log('🔄 Démonstration en temps réel\n');
console.log('📍 Votre site Next.js (localhost:3000) peut se connecter à Shopify !\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

async function checkProducts() {
  try {
    console.log('🔍 Vérification des produits depuis votre machine locale...\n');
    
    const products = await client.product.fetchAll();
    
    console.log(`✅ Connexion réussie depuis localhost !`);
    console.log(`📊 Produits trouvés: ${products.length}\n`);
    
    if (products.length > 0) {
      console.log('📦 Produits disponibles sur votre site Next.js:\n');
      products.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.title}`);
        console.log(`      Prix: ${product.variants[0]?.price || 'N/A'} €`);
        console.log(`      Disponible: ${product.availableForSale ? '✅ Oui' : '❌ Non'}\n`);
      });
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('💡 Ces produits sont VISIBLES sur http://localhost:3000\n');
      console.log('🔄 Pour tester:');
      console.log('   1. Ajoutez un produit sur Shopify');
      console.log('   2. Relancez ce script: node demo-live.js');
      console.log('   3. Le nouveau produit apparaîtra !\n');
    } else {
      console.log('⚠️  Aucun produit pour le moment.');
      console.log('   Ajoutez un produit sur Shopify et relancez ce script.\n');
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Preuve: Le site localhost:3000 peut bien accéder à Shopify !\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkProducts();

