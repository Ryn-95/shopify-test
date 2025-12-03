#!/bin/bash

# Script pour redémarrer proprement le serveur Next.js

echo "🛑 Arrêt des processus Next.js..."
pkill -f "next dev" 2>/dev/null || true

echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

echo "🚀 Démarrage du serveur..."
npm run dev

