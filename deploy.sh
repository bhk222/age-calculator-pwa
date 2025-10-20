#!/bin/bash

# Script de déploiement rapide - Calculateur IPP CNAS
# Usage: ./deploy.sh [vercel|netlify|local]

set -e

echo "🚀 Déploiement Calculateur IPP CNAS"
echo "===================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installation des dépendances...${NC}"
npm ci

echo ""
echo -e "${BLUE}🔨 Build de production...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build échoué${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build réussi !${NC}"
echo ""

# Méthode de déploiement
DEPLOY_METHOD=${1:-"local"}

case $DEPLOY_METHOD in
    vercel)
        echo -e "${BLUE}🌐 Déploiement sur Vercel...${NC}"
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}📥 Installation de Vercel CLI...${NC}"
            npm install -g vercel
        fi
        vercel --prod
        ;;
        
    netlify)
        echo -e "${BLUE}🌐 Déploiement sur Netlify...${NC}"
        if ! command -v netlify &> /dev/null; then
            echo -e "${YELLOW}📥 Installation de Netlify CLI...${NC}"
            npm install -g netlify-cli
        fi
        netlify deploy --prod --dir=dist
        ;;
        
    local)
        echo -e "${BLUE}🏠 Test local du build...${NC}"
        echo -e "${YELLOW}Démarrage du serveur sur http://localhost:3000${NC}"
        npx serve dist -p 3000
        ;;
        
    *)
        echo -e "${RED}❌ Méthode de déploiement inconnue: $DEPLOY_METHOD${NC}"
        echo "Usage: ./deploy.sh [vercel|netlify|local]"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Déploiement terminé !${NC}"
