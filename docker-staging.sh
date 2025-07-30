#!/bin/bash

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Script de déploiement Staging ${NC}"
    echo -e "${BLUE}  TemplateNextGen              ${NC}"
    echo -e "${BLUE}================================${NC}"
    echo ""
}

# Fonction pour vérifier si docker compose est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé"
        exit 1
    fi

    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose n'est pas installé ou ne fonctionne pas"
        exit 1
    fi

    print_message "✅ Docker et Docker Compose sont installés"
}

# Fonction pour vérifier les variables d'environnement
check_env() {
    if [ ! -f "server/.env.staging" ]; then
        print_warning "Le fichier server/.env.staging n'existe pas"
        print_message "Création du fichier server/.env.staging..."

        if [ -f "server/.env.example" ]; then
            cp server/.env.example server/.env.staging
            print_message "✅ Fichier server/.env.staging créé"
            print_warning "⚠️  Veuillez configurer les variables dans server/.env.staging"
        else
            print_error "Le fichier server/.env.example n'existe pas"
            print_message "Créez un fichier server/.env.staging avec les variables suivantes :"
            echo "NODE_ENV=staging"
            echo "PORT=3333"
            echo "HOST=0.0.0.0"
            echo "LOG_LEVEL=debug"
            echo "APP_KEY=uUR_gG7cmFO8W4aEuDkT7i2gpwrgLQBA"
            echo "DB_HOST=spleendb.fr"
            echo "DB_PORT=3306"
            echo "DB_USER=your_db_user"
            echo "DB_PASSWORD=your_db_password"
            echo "DB_DATABASE=your_db_name"
            exit 1
        fi
    else
        print_message "✅ Fichier server/.env.staging trouvé"
    fi
}

# Fonction pour construire et démarrer les services
deploy() {
    print_message "Construction et démarrage des services staging..."

    # Arrêter les services existants
    docker compose -f docker-compose.staging.yml down

    # Construire les images
    docker compose -f docker-compose.staging.yml build --no-cache

    # Démarrer les services
    docker compose -f docker-compose.staging.yml up -d

    if [ $? -eq 0 ]; then
        print_message "✅ Services staging démarrés avec succès"
    else
        print_error "❌ Erreur lors du démarrage des services staging"
        exit 1
    fi
}

# Fonction pour afficher les logs
show_logs() {
    print_message "Affichage des logs staging..."
    docker compose -f docker-compose.staging.yml logs -f
}

# Fonction pour arrêter les services
stop_services() {
    print_message "Arrêt des services staging..."
    docker compose -f docker-compose.staging.yml down
    print_message "✅ Services staging arrêtés"
}

# Fonction pour redémarrer les services
restart_services() {
    print_message "Redémarrage des services staging..."
    docker compose -f docker-compose.staging.yml restart
    print_message "✅ Services staging redémarrés"
}

# Fonction principale
main() {
    print_header

    # Vérifier Docker
    check_docker

    # Vérifier les variables d'environnement
    check_env

    # Menu principal
    echo -e "${YELLOW}Choisissez une action :${NC}"
    echo -e "  1. Déployer (construire et démarrer)"
    echo -e "  2. Voir les logs"
    echo -e "  3. Arrêter les services"
    echo -e "  4. Redémarrer les services"
    echo -e "  5. Quitter"
    read -r choice

    case $choice in
        1)
            deploy
            print_message "🎉 Déploiement staging terminé!"
            echo ""
            echo -e "${GREEN}Services staging disponibles :${NC}"
            echo -e "  - API: http://localhost:3334"
            echo -e "  - Application: http://localhost:4445"
            echo ""
            echo -e "${YELLOW}Variables d'environnement :${NC}"
            echo -e "  - NODE_ENV=staging"
            echo -e "  - LOG_LEVEL=debug"
            ;;
        2)
            show_logs
            ;;
        3)
            stop_services
            ;;
        4)
            restart_services
            ;;
        5)
            print_message "Au revoir!"
            exit 0
            ;;
        *)
            print_error "Choix invalide"
            exit 1
            ;;
    esac
}

# Exécuter la fonction principale
main "$@"
