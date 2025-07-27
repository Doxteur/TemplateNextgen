import { Hono } from 'hono'
import { AuthController } from './controllers/AuthController'
import { PostController } from './controllers/PostController'
import { protectedRoute } from './middleware/auth'
import type { ApiResponse } from 'shared'

const routes = new Hono()

// Route de test
routes.get('/hello', async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }
  return c.json(data, { status: 200 })
})

// Routes d'authentification (publiques)
routes.post('/auth/register', AuthController.register)
routes.post('/auth/login', AuthController.login)

// Routes protégées (nécessitent un token JWT)
routes.get('/auth/profile', protectedRoute(), AuthController.getProfile)

// Routes pour les posts (protégées)
routes.get('/posts', PostController.getAllPosts)
routes.get('/posts/:id', PostController.getPostById)
routes.post('/posts', protectedRoute(), PostController.createPost)
routes.put('/posts/:id', protectedRoute(), PostController.updatePost)
routes.delete('/posts/:id', protectedRoute(), PostController.deletePost)
routes.get('/posts/user/:userId', PostController.getPostsByUser)


export { routes }
