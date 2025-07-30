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

# Builder l'application
RUN bun run build

# Installer les dépendances de production dans le dossier build
RUN cd build && bun install --production

# Exposer le port
EXPOSE 3333

# Commande de démarrage
CMD ["node", "build/bin/server.js"]
