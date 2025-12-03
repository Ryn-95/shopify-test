/**
 * Test direct de l'API Storefront GraphQL
 */

require('dotenv').config({ path: '.env.local' });

const fetch = require('node-fetch');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const query = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          variants(first: 5) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function testStorefrontAPI() {
  try {
    const url = `https://${storeDomain}/api/2023-10/graphql.json`;
    
    console.log('🔍 Test direct de l\'API Storefront GraphQL');
    console.log(`URL: ${url}`);
    console.log(`Token: ${storefrontAccessToken.substring(0, 10)}...\n`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });
    
    const data = await response.json();
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:', JSON.stringify(data.errors, null, 2));
      return;
    }
    
    const products = data.data.products.edges.map((edge) => edge.node);
    
    console.log(`✅ ${products.length} produit(s) trouvé(s) via GraphQL\n`);
    
    if (products.length > 0) {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Disponible: ${product.availableForSale ? '✅ Oui' : '❌ Non'}`);
        console.log(`   Variantes: ${product.variants.edges.length}`);
        if (product.variants.edges.length > 0) {
          const variant = product.variants.edges[0].node;
          console.log(`   Prix: ${variant.price.amount} ${variant.price.currencyCode}`);
          console.log(`   Variante disponible: ${variant.availableForSale ? '✅ Oui' : '❌ Non'}`);
        }
        console.log('');
      });
    } else {
      console.log('⚠️  Aucun produit trouvé via l\'API Storefront');
      console.log('   Cela peut signifier que:');
      console.log('   - Aucun produit n\'est publié sur "Boutique en ligne"');
      console.log('   - Les produits ne sont pas disponibles à la vente');
      console.log('   - Le token n\'a pas les bonnes permissions\n');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testStorefrontAPI();

