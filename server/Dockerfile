# Dockerfile pour le serveur AdonisJS
FROM oven/bun:1 as base

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json ./

# Installer les dépendances
RUN bun install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3333

# Utiliser le mode développement (plus stable)
CMD ["node", "ace", "serve", "--host", "0.0.0.0"]
