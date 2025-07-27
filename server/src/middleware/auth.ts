import type { Context, Next } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Interface pour l'utilisateur dans le token JWT
interface JWTPayload {
  userId: number
  email: string
  name: string
  iat: number
  exp: number
}

// Fonction pour générer un token JWT
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

// Fonction pour vérifier un token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

// Middleware d'authentification JWT personnalisé
export function jwtAuth() {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        message: 'Token d\'authentification requis'
      }, 401)
    }

    const token = authHeader.substring(7) // Enlever "Bearer "
    const payload = verifyToken(token)

    if (!payload) {
      return c.json({
        success: false,
        message: 'Token invalide ou expiré'
      }, 401)
    }

    // Ajouter les informations de l'utilisateur au contexte
    c.set('user', {
      id: payload.userId,
      email: payload.email,
      name: payload.name
    })

    await next()
  }
}

// Middleware Bearer Auth pour les routes protégées
export function protectedRoute() {
  return bearerAuth({
    verifyToken: async (token: string, c: Context) => {
      const payload = verifyToken(token)
      if (payload) {
        // Ajouter les informations de l'utilisateur au contexte
        c.set('user', {
          id: payload.userId,
          email: payload.email,
          name: payload.name
        })
        return true
      }
      return false
    },
    invalidTokenMessage: {
      success: false,
      message: 'Token invalide ou expiré'
    },
    noAuthenticationHeaderMessage: {
      success: false,
      message: 'Token d\'authentification requis'
    }
  })
}

// Helper pour récupérer l'utilisateur depuis le contexte
export function getUser(c: Context) {
  return c.get('user')
}
