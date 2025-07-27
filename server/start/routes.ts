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
