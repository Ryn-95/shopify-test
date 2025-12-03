/**
 * Vérification détaillée d'un produit Shopify
 */

require('dotenv').config({ path: '.env.local' });

const Client = require('shopify-buy');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
});

async function checkProductDetails() {
  try {
    const products = await client.product.fetchAll();
    
    if (products.length === 0) {
      console.log('❌ Aucun produit trouvé');
      return;
    }
    
    console.log(`\n📦 Détails du produit "${products[0].title}":\n`);
    console.log(`ID: ${products[0].id}`);
    console.log(`Handle: ${products[0].handle}`);
    console.log(`Disponible à la vente: ${products[0].availableForSale ? '✅ Oui' : '❌ Non'}`);
    console.log(`Nombre de variantes: ${products[0].variants.length}\n`);
    
    if (products[0].variants.length > 0) {
      console.log('Variantes:');
      products[0].variants.forEach((variant, index) => {
        console.log(`\n  ${index + 1}. ${variant.title}`);
        console.log(`     ID: ${variant.id}`);
        console.log(`     Prix: ${variant.price}`);
        console.log(`     Disponible: ${variant.available ? '✅ Oui' : '❌ Non'}`);
        console.log(`     En stock: ${variant.availableForSale ? '✅ Oui' : '❌ Non'}`);
      });
    }
    
    console.log(`\n${products[0].images.length} image(s) associée(s)`);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    if (!products[0].availableForSale) {
      console.log('⚠️  Le produit n\'est PAS disponible à la vente.');
      console.log('\n💡 Pour le rendre visible sur votre site:');
      console.log('   1. Allez sur Shopify Admin → Produits → "Test"');
      console.log('   2. Vérifiez que le statut est "Publié" (pas "Brouillon")');
      console.log('   3. Vérifiez l\'onglet "Inventaire" - activez le stock ou désactivez le suivi');
      console.log('   4. Vérifiez que le produit est disponible sur "Boutique en ligne"\n');
    } else {
      console.log('✅ Le produit devrait être visible sur http://localhost:3000\n');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

checkProductDetails();

