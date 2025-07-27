# BHVR 🚀

![cover](https://cdn.stevedylan.dev/ipfs/bafybeievx27ar5qfqyqyud7kemnb5n2p4rzt2matogi6qttwkpxonqhra4)

Une stack full-stack TypeScript moderne avec authentification JWT, utilisant Bun, Hono, Vite, React et Prisma.

## ✨ Fonctionnalités

- **🔐 Authentification JWT complète** avec hashage des mots de passe
- **🛡️ Routes protégées** avec middleware Bearer Auth
- **📊 Base de données** avec Prisma ORM et MySQL
- **🎨 Interface moderne** avec Framer Motion et Tailwind CSS
- **🔄 État global** avec Redux Toolkit
- **📱 Responsive Design** avec animations fluides
- **🔒 Sécurité** : Tokens JWT, hashage bcrypt, autorisation par utilisateur

## 🏗️ Architecture

```
TemplateNextGen/
├── client/               # React frontend avec Redux
├── server/               # Hono backend avec JWT
├── shared/               # Types TypeScript partagés
└── prisma/               # Schéma de base de données
```

## 🚀 Démarrage rapide

### Prérequis
- [Bun](https://bun.sh) installé
- MySQL en cours d'exécution

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd TemplateNextGen

# Installer les dépendances
bun install

# Configurer la base de données
cd server
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Générer le client Prisma
bun prisma generate

# Appliquer les migrations
bun prisma db push
```

### Développement

```bash
# Démarrer tous les services
bun run dev

# Ou individuellement
bun run dev:client    # Frontend React (port 5173)
bun run dev:server    # Backend Hono (port 3000)
```

## 🔐 API Authentication

### Créer un compte
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }'
```

### Se connecter
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Routes protégées
```bash
# Récupérer le profil (nécessite un token)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Créer un post (nécessite un token)
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon premier post",
    "content": "Contenu du post"
  }'
```

## 📁 Structure du projet

### Frontend (client/)
```
client/src/
├── app/
│   ├── hooks/redux.ts      # Hooks Redux personnalisés
│   ├── reducers/           # Reducers Redux
│   └── store.ts           # Configuration du store
├── components/
│   ├── core/Layout.tsx    # Layout principal
│   └── ui/                # Composants UI (shadcn/ui)
├── pages/
│   ├── HomePage.tsx       # Page d'accueil
│   └── LoginPage.tsx      # Page de connexion
└── router.tsx             # Configuration des routes
```

### Backend (server/)
```
server/src/
├── controllers/
│   ├── AuthController.ts  # Authentification JWT
│   └── PostController.ts  # Gestion des posts
├── middleware/
│   └── auth.ts           # Middleware JWT
├── routes.ts             # Configuration des routes
└── index.ts              # Point d'entrée
```

### Base de données (prisma/)
```sql
-- Modèle User
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String   -- Hashé avec bcrypt
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

-- Modèle Post
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛡️ Sécurité

- **JWT Tokens** : Expiration de 24h
- **Hashage des mots de passe** : bcrypt avec salt rounds de 10
- **Routes protégées** : Middleware Bearer Auth automatique
- **Autorisation** : Vérification de propriété pour les opérations CRUD
- **Validation** : Vérification des données d'entrée

## 🎨 Interface utilisateur

- **Design moderne** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Composants réutilisables** avec shadcn/ui
- **Responsive** pour tous les appareils
- **Thème sombre/clair** supporté

## 📦 Technologies utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le bundling
- **Redux Toolkit** pour l'état global
- **React Router** pour la navigation
- **Framer Motion** pour les animations
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants

### Backend
- **Hono** framework web
- **Prisma** ORM
- **MySQL** base de données
- **JWT** authentification
- **bcrypt** hashage des mots de passe

### Outils
- **Bun** runtime et package manager
- **Turbo** orchestration monorepo
- **TypeScript** end-to-end

## 🚀 Déploiement

### Frontend
```bash
cd client
bun run build
# Déployer le dossier dist/ sur votre plateforme
```

### Backend
```bash
cd server
bun run build
# Déployer avec Bun, Node.js ou Cloudflare Workers
```

## 📝 Scripts disponibles

```bash
# Développement
bun run dev              # Démarrer tous les services
bun run dev:client       # Frontend uniquement
bun run dev:server       # Backend uniquement

# Build
bun run build            # Build complet
bun run build:client     # Build frontend
bun run build:server     # Build backend

# Base de données
bun run db:generate      # Générer le client Prisma
bun run db:push          # Appliquer les migrations
bun run db:studio        # Ouvrir Prisma Studio

# Linting et tests
bun run lint             # Linter tous les packages
bun run type-check       # Vérification des types
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Hono](https://hono.dev) pour le framework backend
- [shadcn/ui](https://ui.shadcn.com) pour les composants UI
- [Framer Motion](https://www.framer.com/motion/) pour les animations
- [Prisma](https://www.prisma.io) pour l'ORM
