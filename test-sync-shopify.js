/**
 * Test de synchronisation avec Shopify
 * Vérifie que les produits ajoutés au panier sont bien visibles dans Shopify
 */

require('dotenv').config({ path: '.env.local' });

const fetch = require('node-fetch');

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

console.log('🧪 Test de synchronisation avec Shopify Dashboard\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

async function testSync() {
  try {
    // 1. Récupérer un produit
    console.log('📦 Étape 1: Récupération d\'un produit...');
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
    
    const product = productData.data.products.edges[0].node;
    const variant = product.variants.edges[0].node;
    
    console.log(`✅ Produit trouvé: ${product.title}`);
    console.log(`   Variante: ${variant.title}`);
    console.log(`   Prix: ${variant.price.amount} ${variant.price.currencyCode}`);
    console.log(`   Disponible: ${variant.availableForSale ? 'Oui' : 'Non'}\n`);
    
    // 2. Créer un panier
    console.log('🛒 Étape 2: Création d\'un panier...');
    const createCartMutation = `
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
    
    const cartResponse = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: createCartMutation }),
    });
    
    const cartData = await cartResponse.json();
    
    if (cartData.errors || cartData.data.cartCreate.userErrors?.length > 0) {
      console.error('❌ Erreur lors de la création du panier:', cartData.errors || cartData.data.cartCreate.userErrors);
      return;
    }
    
    const cart = cartData.data.cartCreate.cart;
    console.log(`✅ Panier créé: ${cart.id}`);
    console.log(`   URL de checkout: ${cart.checkoutUrl}\n`);
    
    // 3. Ajouter le produit au panier
    console.log('➕ Étape 3: Ajout du produit au panier...');
    const addToCartMutation = `
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
        query: addToCartMutation,
        variables: {
          cartId: cart.id,
          lines: [{ merchandiseId: variant.id, quantity: 2 }],
        },
      }),
    });
    
    const addData = await addResponse.json();
    
    if (addData.errors || addData.data.cartLinesAdd.userErrors?.length > 0) {
      console.error('❌ Erreur lors de l\'ajout au panier:', addData.errors || addData.data.cartLinesAdd.userErrors);
      return;
    }
    
    const updatedCart = addData.data.cartLinesAdd.cart;
    console.log(`✅ Produit ajouté au panier!`);
    console.log(`   Articles dans le panier: ${updatedCart.lines.edges.length}`);
    updatedCart.lines.edges.forEach((edge, index) => {
      const item = edge.node.merchandise;
      console.log(`   ${index + 1}. ${item.product.title} - ${item.title}`);
      console.log(`      Quantité: ${edge.node.quantity}`);
      console.log(`      Prix unitaire: ${item.price.amount} ${item.price.currencyCode}`);
    });
    console.log(`   Sous-total: ${updatedCart.cost.subtotalAmount.amount} ${updatedCart.cost.subtotalAmount.currencyCode}`);
    console.log(`   Total: ${updatedCart.cost.totalAmount.amount} ${updatedCart.cost.totalAmount.currencyCode}\n`);
    
    // 4. Instructions pour vérifier dans Shopify
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📊 COMMENT VÉRIFIER DANS SHOPIFY DASHBOARD:\n');
    console.log('1. Allez sur votre admin Shopify:');
    console.log(`   https://admin.shopify.com/store/${storeDomain.split('.')[0]}\n`);
    console.log('2. Dans le menu de gauche, cliquez sur "Commandes" (Orders)\n');
    console.log('3. IMPORTANT: Les paniers créés via l\'API Storefront ne sont PAS');
    console.log('   automatiquement visibles dans "Commandes" tant qu\'ils ne sont pas');
    console.log('   convertis en commandes (checkout complété).\n');
    console.log('4. Pour voir les paniers actifs:');
    console.log('   - Allez dans "Paramètres" > "Checkout"');
    console.log('   - Ou utilisez l\'URL de checkout pour compléter une commande test\n');
    console.log('5. URL de checkout pour tester:');
    console.log(`   ${updatedCart.checkoutUrl}\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('💡 NOTE IMPORTANTE:\n');
    console.log('L\'API Storefront crée des "paniers" (carts), pas des commandes.');
    console.log('Les commandes apparaissent dans Shopify seulement après:');
    console.log('- Le client complète le checkout');
    console.log('- Le paiement est traité\n');
    console.log('✅ Votre site est bien connecté à Shopify!');
    console.log('   Les produits ajoutés au panier sont synchronisés avec Shopify.');
    console.log('   Pour voir une commande dans le dashboard, complétez le checkout.\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSync();

