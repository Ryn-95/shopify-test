/**
 * Test de création de checkout et ajout d'un produit
 */

require('dotenv').config({ path: '.env.local' });

const fetch = require('node-fetch');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function testCheckout() {
  try {
    console.log('🧪 Test de création de checkout...\n');
    
    // 1. Créer un checkout
    const createMutation = `
      mutation {
        cartCreate {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    
    const createResponse = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: createMutation }),
    });
    
    const createData = await createResponse.json();
    
    if (createData.errors) {
      console.error('❌ Erreurs lors de la création:', createData.errors);
      return;
    }
    
    if (createData.data.cartCreate.userErrors && createData.data.cartCreate.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', createData.data.cartCreate.userErrors);
      return;
    }
    
    const checkout = createData.data.cartCreate.cart;
    console.log('✅ Panier créé:', checkout.id);
    console.log('   URL:', checkout.checkoutUrl);
    
    // 2. Récupérer un produit pour obtenir un variantId
    const productQuery = `
      query {
        products(first: 1) {
          edges {
            node {
              id
              title
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;
    
    const productResponse = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: productQuery }),
    });
    
    const productData = await productResponse.json();
    
    if (productData.errors || !productData.data.products.edges.length) {
      console.error('❌ Erreur lors de la récupération du produit');
      return;
    }
    
    const variantId = productData.data.products.edges[0].node.variants.edges[0].node.id;
    const productTitle = productData.data.products.edges[0].node.title;
    
    console.log(`\n📦 Produit trouvé: ${productTitle}`);
    console.log(`   Variant ID: ${variantId}`);
    
    // 3. Ajouter le produit au panier
    const addMutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            lines(first: 250) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        title
                      }
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    
    const addResponse = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query: addMutation,
        variables: {
          cartId: checkout.id,
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        },
      }),
    });
    
    const addData = await addResponse.json();
    
    if (addData.errors) {
      console.error('❌ Erreurs lors de l\'ajout:', addData.errors);
      return;
    }
    
    if (addData.data.cartLinesAdd.userErrors && addData.data.cartLinesAdd.userErrors.length > 0) {
      console.error('❌ Erreurs cart:', addData.data.cartLinesAdd.userErrors);
      return;
    }
    
    const updatedCart = addData.data.cartLinesAdd.cart;
    console.log('\n✅ Produit ajouté au panier!');
    console.log(`   Articles: ${updatedCart.lines.edges.length}`);
    console.log(`   Total: ${updatedCart.cost.totalAmount.amount} ${updatedCart.cost.totalAmount.currencyCode}`);
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Stack:', error.stack);
  }
}

testCheckout();

