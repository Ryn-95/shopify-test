/**
 * Script de test pour vérifier la connexion Shopify
 */

require('dotenv').config({ path: '.env.local' })

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

console.log('🔍 Test de connexion Shopify\n')
console.log('Variables d\'environnement:')
console.log('  - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:', storeDomain || '❌ NON DÉFINIE')
console.log('  - NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:', storefrontAccessToken ? '✅ Définie (' + storefrontAccessToken.substring(0, 10) + '...)' : '❌ NON DÉFINIE')
console.log('')

if (!storeDomain || !storefrontAccessToken) {
  console.error('❌ Les variables d\'environnement ne sont pas définies!')
  console.log('\n📝 Pour corriger:')
  console.log('1. Créez un fichier .env.local à la racine du projet')
  console.log('2. Ajoutez les lignes suivantes:')
  console.log('   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=votre-store.myshopify.com')
  console.log('   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=votre-token')
  process.exit(1)
}

async function testShopifyConnection() {
  try {
    console.log('🛍️ Test de connexion à Shopify...\n')
    
    const query = `
      query {
        products(first: 5) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    
    const response = await fetch(`https://${storeDomain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur HTTP:', response.status, response.statusText)
      console.error('Réponse:', errorText)
      return
    }
    
    const data = await response.json()
    
    if (data.errors) {
      console.error('❌ Erreurs GraphQL:')
      data.errors.forEach((error) => {
        console.error('  -', error.message)
      })
      return
    }
    
    const products = data.data.products.edges.map((edge) => edge.node)
    
    console.log(`✅ Connexion réussie!`)
    console.log(`📦 ${products.length} produit(s) trouvé(s)\n`)
    
    if (products.length === 0) {
      console.log('⚠️  Aucun produit trouvé dans votre boutique Shopify.')
      console.log('   Vérifiez que vous avez des produits publiés dans votre admin Shopify.\n')
    } else {
      console.log('Premiers produits:')
      products.forEach((product, index) => {
        console.log(`\n${index + 1}. ${product.title}`)
        console.log(`   Handle: ${product.handle}`)
        console.log(`   Disponible: ${product.availableForSale ? '✅' : '❌'}`)
        console.log(`   Images: ${product.images.edges.length}`)
        if (product.variants.edges.length > 0) {
          console.log(`   Prix: ${product.variants.edges[0].node.price.amount} EUR`)
        }
      })
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    console.error('\nVérifiez:')
    console.error('1. Que votre domaine Shopify est correct')
    console.error('2. Que votre token Storefront API est valide')
    console.error('3. Que votre connexion internet fonctionne')
  }
}

testShopifyConnection()

