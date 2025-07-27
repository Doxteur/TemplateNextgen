import type { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { generateToken, getUser } from '../middleware/auth'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export class AuthController {
  // Inscription d'un utilisateur
  static async register(c: Context) {
    try {
      const body = await c.req.json()
      const { email, name, password } = body

      // Validation basique
      if (!email || !password) {
        return c.json({
          success: false,
          message: 'Email et mot de passe requis'
        }, 400)
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return c.json({
          success: false,
          message: 'Un utilisateur avec cet email existe déjà'
        }, 409)
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10)

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword
        }
      })

      // Générer le token JWT
      const token = generateToken({
        userId: Number(user.id),
        email: user.email,
        name: user.name || ''
      })

      return c.json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          token
        }
      }, 201)

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Connexion d'un utilisateur
  static async login(c: Context) {
    try {
      const body = await c.req.json()
      const { email, password } = body

      if (!email || !password) {
        return c.json({
          success: false,
          message: 'Email et mot de passe requis'
        }, 400)
      }

      // Trouver l'utilisateur
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return c.json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        }, 401)
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return c.json({
          success: false,
          message: 'Email ou mot de passe incorrect'
        }, 401)
      }

      // Générer le token JWT
      const token = generateToken({
        userId: Number(user.id),
        email: user.email,
        name: user.name || ''
      })

      return c.json({
        success: true,
        message: 'Connexion réussie',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          },
          token
        }
      })

    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Récupérer le profil utilisateur
  static async getProfile(c: Context) {
    try {
      const user = getUser(c)

      if (!user) {
        return c.json({
          success: false,
          message: 'Non autorisé'
        }, 401)
      }

      const userData = await prisma.user.findUnique({
        where: { id: user.id }
      })

      if (!userData) {
        return c.json({
          success: false,
          message: 'Utilisateur non trouvé'
        }, 404)
      }

      return c.json({
        success: true,
        data: {
          id: userData.id,
          email: userData.email,
          name: userData.name
        }
      })

    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }
}
