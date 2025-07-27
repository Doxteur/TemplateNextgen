# Configuration JWT avec Hono

## Installation des dépendances

```bash
cd server
bun add jsonwebtoken @types/jsonwebtoken
```

## Configuration des variables d'environnement

Créez un fichier `.env` dans le dossier `server/` avec :

```env
# Base de données
DATABASE_URL="mysql://root:password@localhost:3306/bhvr_db"

# JWT
JWT_SECRET="votre-super-secret-jwt-tres-securise-changez-moi-en-production"

# Serveur
PORT=3000
```

## Fonctionnalités implémentées

### 🔐 Middleware d'authentification JWT

- **`generateToken()`** : Génère un token JWT avec les informations utilisateur
- **`verifyToken()`** : Vérifie et décode un token JWT
- **`protectedRoute()`** : Middleware Bearer Auth pour protéger les routes
- **`getUser()`** : Helper pour récupérer l'utilisateur depuis le contexte

### 🛡️ Routes protégées

- `GET /api/auth/profile` - Profil utilisateur (protégé)
- `POST /api/posts` - Créer un post (protégé)
- `PUT /api/posts/:id` - Modifier un post (protégé, auteur uniquement)
- `DELETE /api/posts/:id` - Supprimer un post (protégé, auteur uniquement)

### 🔓 Routes publiques

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/posts` - Liste des posts (public)
- `GET /api/posts/:id` - Détail d'un post (public)

## Utilisation côté client

### Connexion
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

const { data: { token, user } } = await response.json()
// Stocker le token dans localStorage ou Redux
```

### Requêtes authentifiées
```typescript
const response = await fetch('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## Sécurité

- Tokens JWT avec expiration de 24h
- Vérification automatique des tokens sur les routes protégées
- Autorisation basée sur l'utilisateur pour les opérations CRUD
- Messages d'erreur sécurisés

## Prochaines étapes

1. Ajouter le hash des mots de passe avec bcrypt
2. Implémenter le refresh token
3. Ajouter la validation des données avec Zod
4. Configurer CORS pour la production
