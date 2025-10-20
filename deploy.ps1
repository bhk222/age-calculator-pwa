# Script de déploiement rapide - Calculateur IPP CNAS
# Usage: .\deploy.ps1 [vercel|netlify|local]

param(
    [string]$DeployMethod = "local"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Déploiement Calculateur IPP CNAS" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
try {
    $null = Get-Command node -ErrorAction Stop
} catch {
    Write-Host "❌ Node.js n'est pas installé" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installation des dépendances..." -ForegroundColor Blue
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation échouée" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔨 Build de production..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build échoué" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi !" -ForegroundColor Green
Write-Host ""

# Méthode de déploiement
switch ($DeployMethod) {
    "vercel" {
        Write-Host "🌐 Déploiement sur Vercel..." -ForegroundColor Blue
        try {
            $null = Get-Command vercel -ErrorAction Stop
        } catch {
            Write-Host "📥 Installation de Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        vercel --prod
    }
    
    "netlify" {
        Write-Host "🌐 Déploiement sur Netlify..." -ForegroundColor Blue
        try {
            $null = Get-Command netlify -ErrorAction Stop
        } catch {
            Write-Host "📥 Installation de Netlify CLI..." -ForegroundColor Yellow
            npm install -g netlify-cli
        }
        netlify deploy --prod --dir=dist
    }
    
    "local" {
        Write-Host "🏠 Test local du build..." -ForegroundColor Blue
        Write-Host "Démarrage du serveur sur http://localhost:3000" -ForegroundColor Yellow
        npx serve dist -p 3000
    }
    
    default {
        Write-Host "❌ Méthode de déploiement inconnue: $DeployMethod" -ForegroundColor Red
        Write-Host "Usage: .\deploy.ps1 [vercel|netlify|local]"
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
