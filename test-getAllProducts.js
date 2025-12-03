/**
 * Test exact de getAllProducts comme dans le code
 */

require('dotenv').config({ path: '.env.local' });

// Simuler le comportement de getAllProducts
const Client = require('shopify-buy');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client = Client.buildClient({
  domain: storeDomain,
  storefrontAccessToken: storefrontAccessToken,
});

async function testGetAllProducts() {
  try {
    console.log('🛍️ Récupération des produits depuis Shopify...');
    const products = await client.product.fetchAll();
    
    console.log(`✅ ${products.length} produit(s) récupéré(s)`);
    
    if (products.length === 0) {
      console.log('⚠️  Aucun produit trouvé');
      return;
    }
    
    // Conversion exacte comme dans getAllProducts
    const converted = products.map((product) => {
      try {
        return {
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
          variants: product.variants.map((variant) => {
            const price = typeof variant.price === 'object' && variant.price?.amount 
              ? variant.price.amount 
              : variant.price?.toString() || '0.00';
            
            return {
              id: variant.id.toString(),
              title: variant.title,
              price: price,
              compareAtPrice: typeof variant.compareAtPrice === 'object' && variant.compareAtPrice?.amount
                ? variant.compareAtPrice.amount
                : variant.compareAtPrice?.toString() || undefined,
              available: variant.available,
              image: variant.image
                ? {
                    src: variant.image.src,
                    alt: variant.image.altText || product.title,
                  }
                : undefined,
            };
          }),
          options: product.options?.map((opt) => ({
            id: opt.id?.toString() || '',
            name: opt.name,
            values: opt.values,
          })),
          priceRange: product.variants.length > 0
            ? {
                minVariantPrice: {
                  amount: Math.min(
                    ...product.variants.map((v) => {
                      const price = typeof v.price === 'object' && v.price?.amount 
                        ? v.price.amount 
                        : v.price?.toString() || '0';
                      return parseFloat(price);
                    })
                  ).toString(),
                  currencyCode: 'EUR',
                },
              }
            : undefined,
          availableForSale: product.availableForSale,
        };
      } catch (err) {
        console.error(`❌ Erreur lors de la conversion du produit ${product.title}:`, err);
        throw err;
      }
    });
    
    console.log(`\n✅ Conversion réussie: ${converted.length} produit(s)`);
    console.log(`\n📦 Premier produit converti:`);
    console.log(`   Titre: ${converted[0].title}`);
    console.log(`   ID: ${converted[0].id}`);
    console.log(`   Prix: ${converted[0].variants[0]?.price}`);
    console.log(`   Disponible: ${converted[0].availableForSale}`);
    console.log(`   Images: ${converted[0].images.length}`);
    
    console.log('\n✅ Le produit devrait être visible sur le site !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error);
    console.error('Stack:', error.stack);
  }
}

testGetAllProducts();

