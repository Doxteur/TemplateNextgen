#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

class MimiCLI {
  private static readonly CONTROLLER_TEMPLATE = `import type { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class {{CONTROLLER_NAME}} {
  // Récupérer tous les {{MODEL_NAME_PLURAL}}
  static async getAll{{MODEL_NAME_PLURAL}}(c: Context) {
    try {
      const {{MODEL_NAME_PLURAL}} = await prisma.{{MODEL_NAME_LOWERCASE}}.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })

      return c.json({
        success: true,
        data: {{MODEL_NAME_PLURAL}}
      })

    } catch (error) {
      console.error('Erreur lors de la récupération des {{MODEL_NAME_PLURAL}}:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Récupérer un {{MODEL_NAME}} par ID
  static async get{{MODEL_NAME}}ById(c: Context) {
    try {
      const {{MODEL_NAME_LOWERCASE}}Id = c.req.param('id')

      const {{MODEL_NAME_LOWERCASE}} = await prisma.{{MODEL_NAME_LOWERCASE}}.findUnique({
        where: { id: {{MODEL_NAME_LOWERCASE}}Id }
      })

      if (!{{MODEL_NAME_LOWERCASE}}) {
        return c.json({
          success: false,
          message: '{{MODEL_NAME}} non trouvé'
        }, 404)
      }

      return c.json({
        success: true,
        data: {{MODEL_NAME_LOWERCASE}}
      })

    } catch (error) {
      console.error('Erreur lors de la récupération du {{MODEL_NAME}}:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Créer un nouveau {{MODEL_NAME}}
  static async create{{MODEL_NAME}}(c: Context) {
    try {
      const body = await c.req.json()

      const {{MODEL_NAME_LOWERCASE}} = await prisma.{{MODEL_NAME_LOWERCASE}}.create({
        data: body
      })

      return c.json({
        success: true,
        message: '{{MODEL_NAME}} créé avec succès',
        data: {{MODEL_NAME_LOWERCASE}}
      }, 201)

    } catch (error) {
      console.error('Erreur lors de la création du {{MODEL_NAME}}:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Mettre à jour un {{MODEL_NAME}}
  static async update{{MODEL_NAME}}(c: Context) {
    try {
      const {{MODEL_NAME_LOWERCASE}}Id = c.req.param('id')
      const body = await c.req.json()

      const {{MODEL_NAME_LOWERCASE}} = await prisma.{{MODEL_NAME_LOWERCASE}}.update({
        where: { id: {{MODEL_NAME_LOWERCASE}}Id },
        data: body
      })

      return c.json({
        success: true,
        message: '{{MODEL_NAME}} mis à jour avec succès',
        data: {{MODEL_NAME_LOWERCASE}}
      })

    } catch (error) {
      console.error('Erreur lors de la mise à jour du {{MODEL_NAME}}:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Supprimer un {{MODEL_NAME}}
  static async delete{{MODEL_NAME}}(c: Context) {
    try {
      const {{MODEL_NAME_LOWERCASE}}Id = c.req.param('id')

      await prisma.{{MODEL_NAME_LOWERCASE}}.delete({
        where: { id: {{MODEL_NAME_LOWERCASE}}Id }
      })

      return c.json({
        success: true,
        message: '{{MODEL_NAME}} supprimé avec succès'
      })

    } catch (error) {
      console.error('Erreur lors de la suppression du {{MODEL_NAME}}:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }
}
`

  private static readonly ROUTES_TEMPLATE = `
// Routes pour {{MODEL_NAME_LOWERCASE}}
routes.get('/{{MODEL_NAME_LOWERCASE}}s', {{CONTROLLER_NAME}}.getAll{{MODEL_NAME_PLURAL}})
routes.get('/{{MODEL_NAME_LOWERCASE}}s/:id', {{CONTROLLER_NAME}}.get{{MODEL_NAME}}ById)
routes.post('/{{MODEL_NAME_LOWERCASE}}s', {{CONTROLLER_NAME}}.create{{MODEL_NAME}})
routes.put('/{{MODEL_NAME_LOWERCASE}}s/:id', {{CONTROLLER_NAME}}.update{{MODEL_NAME}})
routes.delete('/{{MODEL_NAME_LOWERCASE}}s/:id', {{CONTROLLER_NAME}}.delete{{MODEL_NAME}})
`

  static async run() {
    const args = process.argv.slice(2)

    if (args.length === 0) {
      this.showHelp()
      return
    }

    const command = args[0] || ''
    const name = args[1] || ''

    if (!name) {
      console.error('❌ Nom manquant. Usage: mimi add:controller NomController')
      return
    }

    switch (command) {
      case 'add:controller':
        await this.addController(name)
        break
      default:
        console.error(`❌ Commande inconnue: ${command}`)
        this.showHelp()
    }
  }

  private static showHelp() {
    console.log(`
🎭 Mimi CLI - Générateur de code pour BHVR

Usage:
  mimi add:controller <NomController>

Exemples:
  mimi add:controller UserController
  mimi add:controller ProductController
  mimi add:controller CategoryController

Options:
  --help     Afficher cette aide
`)
  }

  private static async addController(controllerName: string) {
    try {
      // Vérifier que le nom se termine par "Controller"
      if (!controllerName.endsWith('Controller')) {
        controllerName = `${controllerName}Controller`
      }

      // Extraire le nom du modèle (sans "Controller")
      const modelName = controllerName.replace('Controller', '')
      const modelNameLowercase = modelName.charAt(0).toLowerCase() + modelName.slice(1)
      const modelNamePlural = modelNameLowercase + 's'

      // Créer le dossier controllers s'il n'existe pas
      const controllersDir = join(process.cwd(), 'src', 'controllers')
      if (!existsSync(controllersDir)) {
        mkdirSync(controllersDir, { recursive: true })
      }

      // Chemin du fichier contrôleur
      const controllerPath = join(controllersDir, `${controllerName}.ts`)

      // Vérifier si le fichier existe déjà
      if (existsSync(controllerPath)) {
        console.error(`❌ Le contrôleur ${controllerName} existe déjà!`)
        return
      }

      // Générer le contenu du contrôleur
      let controllerContent = this.CONTROLLER_TEMPLATE
        .replace(/{{CONTROLLER_NAME}}/g, controllerName)
        .replace(/{{MODEL_NAME}}/g, modelName)
        .replace(/{{MODEL_NAME_LOWERCASE}}/g, modelNameLowercase)
        .replace(/{{MODEL_NAME_PLURAL}}/g, modelNamePlural)

      // Écrire le fichier contrôleur
      writeFileSync(controllerPath, controllerContent)

      // Générer les routes
      const routesContent = this.ROUTES_TEMPLATE
        .replace(/{{CONTROLLER_NAME}}/g, controllerName)
        .replace(/{{MODEL_NAME}}/g, modelName)
        .replace(/{{MODEL_NAME_LOWERCASE}}/g, modelNameLowercase)
        .replace(/{{MODEL_NAME_PLURAL}}/g, modelNamePlural)

      // Ajouter les routes au fichier routes.ts
      await this.addRoutesToFile(routesContent, controllerName)

      console.log(`
✅ Contrôleur ${controllerName} créé avec succès!

📁 Fichier créé: src/controllers/${controllerName}.ts
🔗 Routes ajoutées: src/routes.ts

🚀 Prochaines étapes:
1. Vérifier le contrôleur généré
2. Adapter les méthodes selon vos besoins
3. Tester les nouvelles routes
`)
    } catch (error) {
      console.error('❌ Erreur lors de la création du contrôleur:', error)
    }
  }

  private static async addRoutesToFile(routesContent: string, controllerName: string) {
    try {
      const routesPath = join(process.cwd(), 'src', 'routes.ts')

      if (!existsSync(routesPath)) {
        console.error('❌ Fichier routes.ts non trouvé!')
        return
      }

      // Lire le contenu actuel
      let content = readFileSync(routesPath, 'utf-8')

      // Ajouter l'import du contrôleur
      const importStatement = `import { ${controllerName} } from './controllers/${controllerName}'`

      if (!content.includes(importStatement)) {
        // Trouver la ligne après les imports existants
        const lines = content.split('\n')
        let insertIndex = 0

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          if (line && line.startsWith('import')) {
            insertIndex = i + 1
          } else if (line && line.trim() === '') {
            break
          }
        }

        lines.splice(insertIndex, 0, importStatement)
        content = lines.join('\n')
      }

      // Ajouter les routes avant la dernière ligne (export)
      const exportIndex = content.lastIndexOf('export { routes }')
      if (exportIndex !== -1) {
        content = content.slice(0, exportIndex) + routesContent + '\n' + content.slice(exportIndex)
      }

      // Écrire le fichier mis à jour
      writeFileSync(routesPath, content)
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout des routes:', error)
    }
  }
}

// Exécuter le CLI
MimiCLI.run().catch(console.error)
