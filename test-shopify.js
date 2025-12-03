/**
 * Script de test pour vérifier la connexion à Shopify
 * Exécutez avec: node test-shopify.js
 */

require('dotenv').config({ path: '.env.local' });

const Client = require('shopify-buy');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !storefrontAccessToken) {
  console.error('❌ Variables d\'environnement manquantes!');
  console.log('Vérifiez que .env.local contient:');
  console.log('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-boutique.myshopify.com');
  console.log('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre-token');
  process.exit(1);
}

console.log('🔍 Test de connexion à Shopify...');
console.log(`Domain: ${storeDomain}`);
console.log(`Token: ${storefrontAccessToken.substring(0, 10)}...`);

const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
});

async function testConnection() {
  try {
    console.log('\n📦 Récupération des produits...');
    const products = await client.product.fetchAll();
    
    console.log(`\n✅ Connexion réussie!`);
    console.log(`📊 Nombre de produits trouvés: ${products.length}`);
    
    if (products.length > 0) {
      console.log('\n📋 Liste des produits:');
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title} (ID: ${product.id})`);
        console.log(`   Disponible: ${product.availableForSale ? 'Oui' : 'Non'}`);
        console.log(`   Variantes: ${product.variants.length}`);
      });
    } else {
      console.log('\n⚠️  Aucun produit trouvé sur Shopify.');
      console.log('   Assurez-vous d\'avoir au moins un produit publié dans votre boutique.');
    }
  } catch (error) {
    console.error('\n❌ Erreur lors de la connexion:');
    console.error(error.message);
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('\n💡 Le token Storefront API est invalide ou n\'a pas les bonnes permissions.');
      console.error('   Vérifiez votre token dans Shopify Admin.');
    }
  }
}

testConnection();

