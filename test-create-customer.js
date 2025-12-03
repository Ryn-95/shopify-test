/**
 * Script de test pour créer un client dans Shopify
 * Utilisez ce script pour vérifier que la création de compte fonctionne
 */

require('dotenv').config({ path: '.env.local' })

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN

if (!STORE_DOMAIN || !ACCESS_TOKEN) {
  console.error('❌ Variables d\'environnement manquantes !')
  console.log('Vérifiez que .env.local contient :')
  console.log('  - SHOPIFY_STORE_DOMAIN')
  console.log('  - SHOPIFY_ADMIN_API_ACCESS_TOKEN')
  process.exit(1)
}

async function testCreateCustomer() {
  const testEmail = `test-${Date.now()}@example.com`
  
  console.log('🧪 Test de création de client...')
  console.log(`   Email: ${testEmail}`)
  console.log(`   Store: ${STORE_DOMAIN}`)
  console.log(`   Token: ${ACCESS_TOKEN.substring(0, 10)}...`)
  console.log('')

  try {
    const response = await fetch(
      `https://${STORE_DOMAIN}/admin/api/2024-01/customers.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ACCESS_TOKEN,
        },
        body: JSON.stringify({
          customer: {
            email: testEmail,
            first_name: 'Test',
            last_name: 'User',
            accepts_marketing: false,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erreur HTTP:', response.status)
      console.error('   Réponse:', errorText)
      
      if (response.status === 401) {
        console.error('\n💡 Le token Admin API est invalide ou expiré')
        console.error('   Vérifiez votre token dans Shopify Admin')
      } else if (response.status === 403) {
        console.error('\n💡 Permissions manquantes')
        console.error('   Activez "write_customers" dans Shopify Admin → Applications')
      }
      
      process.exit(1)
    }

    const data = await response.json()
    console.log('✅ Client créé avec succès !')
    console.log('   ID:', data.customer.id)
    console.log('   Email:', data.customer.email)
    console.log('   Nom:', `${data.customer.first_name} ${data.customer.last_name}`)
    console.log('')
    console.log('🎉 La création de compte fonctionne !')
    console.log('   Vous pouvez maintenant tester sur votre site : http://localhost:3000/login')
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message)
    console.error('')
    console.error('Vérifiez :')
    console.error('  1. Que le serveur Shopify est accessible')
    console.error('  2. Que les variables d\'environnement sont correctes')
    console.error('  3. Que les permissions Admin API sont activées')
    process.exit(1)
  }
}

testCreateCustomer()

