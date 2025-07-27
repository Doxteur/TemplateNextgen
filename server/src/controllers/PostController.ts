import type { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { getUser } from '../middleware/auth'

const prisma = new PrismaClient()

export class PostController {
  // Récupérer tous les posts
  static async getAllPosts(c: Context) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return c.json({
        success: true,
        data: posts
      })

    } catch (error) {
      console.error('Erreur lors de la récupération des posts:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Récupérer un post par ID
  static async getPostById(c: Context) {
    try {
      const postId = c.req.param('id')

      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      if (!post) {
        return c.json({
          success: false,
          message: 'Post non trouvé'
        }, 404)
      }

      return c.json({
        success: true,
        data: post
      })

    } catch (error) {
      console.error('Erreur lors de la récupération du post:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Créer un nouveau post
  static async createPost(c: Context) {
    try {
      const body = await c.req.json()
      const { title, content } = body

      if (!title) {
        return c.json({
          success: false,
          message: 'Titre requis'
        }, 400)
      }

      // Récupérer l'utilisateur authentifié
      const user = getUser(c)
      if (!user) {
        return c.json({
          success: false,
          message: 'Non autorisé'
        }, 401)
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user.id,
          published: false
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return c.json({
        success: true,
        message: 'Post créé avec succès',
        data: post
      }, 201)

    } catch (error) {
      console.error('Erreur lors de la création du post:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Mettre à jour un post
  static async updatePost(c: Context) {
    try {
      const postId = c.req.param('id')
      const body = await c.req.json()
      const { title, content, published } = body

      // Récupérer l'utilisateur authentifié
      const user = getUser(c)
      if (!user) {
        return c.json({
          success: false,
          message: 'Non autorisé'
        }, 401)
      }

      // Vérifier que l'utilisateur est l'auteur du post
      const existingPost = await prisma.post.findUnique({
        where: { id: Number(postId) }
      })

      if (!existingPost) {
        return c.json({
          success: false,
          message: 'Post non trouvé'
        }, 404)
      }

      if (existingPost.authorId !== user.id) {
        return c.json({
          success: false,
          message: 'Non autorisé à modifier ce post'
        }, 403)
      }

      const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
          title,
          content,
          published
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      return c.json({
        success: true,
        message: 'Post mis à jour avec succès',
        data: post
      })

    } catch (error) {
      console.error('Erreur lors de la mise à jour du post:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Supprimer un post
  static async deletePost(c: Context) {
    try {
      const postId = c.req.param('id')

      // Récupérer l'utilisateur authentifié
      const user = getUser(c)
      if (!user) {
        return c.json({
          success: false,
          message: 'Non autorisé'
        }, 401)
      }

      // Vérifier que l'utilisateur est l'auteur du post
      const existingPost = await prisma.post.findUnique({
        where: { id: Number(postId) }
      })

      if (!existingPost) {
        return c.json({
          success: false,
          message: 'Post non trouvé'
        }, 404)
      }

      if (existingPost.authorId !== user.id) {
        return c.json({
          success: false,
          message: 'Non autorisé à supprimer ce post'
        }, 403)
      }

      await prisma.post.delete({
        where: { id: Number(postId) }
      })

      return c.json({
        success: true,
        message: 'Post supprimé avec succès'
      })

    } catch (error) {
      console.error('Erreur lors de la suppression du post:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }

  // Récupérer les posts d'un utilisateur
  static async getPostsByUser(c: Context) {
    try {
      const userId = c.req.param('userId')

      const posts = await prisma.post.findMany({
        where: { authorId: Number(userId) },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return c.json({
        success: true,
        data: posts
      })

    } catch (error) {
      console.error('Erreur lors de la récupération des posts utilisateur:', error)
      return c.json({
        success: false,
        message: 'Erreur interne du serveur'
      }, 500)
    }
  }
}
