/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/auth/login', [AuthController, 'login'])

    router.post('/auth/register', [AuthController, 'register'])
  })
  .prefix('/api')

// Debug route to check if files exist
router.get('/debug', async ({ response }) => {
  const fs = await import('fs')
  const path = await import('path')

  try {
    const publicDir = path.join(process.cwd(), 'public')
    const files = fs.readdirSync(publicDir)
    return response.json({
      cwd: process.cwd(),
      publicDir,
      files: files.slice(0, 10) // First 10 files
    })
  } catch (error) {
    return response.json({ error: error.message })
  }
})

// Serve static files with correct MIME types
router.get('/assets/*', async ({ params, response }) => {
  const filePath = `public/assets/${params['*']}`
  const ext = filePath.split('.').pop()

  let contentType = 'text/plain'
  if (ext === 'js') contentType = 'application/javascript'
  else if (ext === 'css') contentType = 'text/css'
  else if (ext === 'html') contentType = 'text/html'

  response.header('Content-Type', contentType)
  return response.download(filePath)
})

// Serve React app for all non-API routes
router.get('*', async ({ response }) => {
  return response.download('public/index.html')
})
