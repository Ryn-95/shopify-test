/**
 * Test direct de l'API pour voir ce qui est retourné
 */

require('dotenv').config({ path: '.env.local' });

const Client = require('shopify-buy');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
});

async function testDirect() {
  try {
    console.log('🔍 Test direct de fetchAll()...\n');
    
    const products = await client.product.fetchAll();
    
    console.log(`✅ Nombre de produits: ${products.length}\n`);
    
    if (products.length > 0) {
      const product = products[0];
      console.log('📦 Premier produit:');
      console.log(`   Titre: ${product.title}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   availableForSale: ${product.availableForSale}`);
      console.log(`   Variantes: ${product.variants.length}`);
      
      if (product.variants.length > 0) {
        const variant = product.variants[0];
        console.log(`\n   Variante 1:`);
        console.log(`      ID: ${variant.id}`);
        console.log(`      Prix: ${JSON.stringify(variant.price)}`);
        console.log(`      available: ${variant.available}`);
        console.log(`      availableForSale: ${variant.availableForSale}`);
      }
      
      console.log(`\n   Images: ${product.images.length}`);
      if (product.images.length > 0) {
        console.log(`   Première image: ${product.images[0].src}`);
      }
      
      // Test de la conversion comme dans getAllProducts
      console.log('\n🔄 Test de conversion (comme dans getAllProducts):\n');
      
      const converted = products.map((product) => ({
        id: product.id.toString(),
        title: product.title,
        description: product.description || '',
        descriptionHtml: product.descriptionHtml,
        handle: product.handle,
        images: product.images.map((img) => ({
          id: img.id?.toString() || '',
          src: img.src,
          alt: img.altText || product.title,
        })),
        variants: product.variants.map((variant) => ({
          id: variant.id.toString(),
          title: variant.title,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice,
          available: variant.available,
        })),
        availableForSale: product.availableForSale,
      }));
      
      console.log('✅ Conversion réussie!');
      console.log(`   Produit converti: ${converted[0].title}`);
      console.log(`   ID converti: ${converted[0].id}`);
      console.log(`   Prix variante: ${converted[0].variants[0]?.price}`);
      
    } else {
      console.log('⚠️  Aucun produit trouvé');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    console.error('Stack:', error.stack);
  }
}

testDirect();

