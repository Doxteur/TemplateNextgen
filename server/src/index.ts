import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { routes } from './routes'

const app = new Hono()

// Middleware global
app.use('*', logger())
app.use('*', timing())
app.use('*', cors())

// Routes
app.route('/api', routes)

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'BHVR API Server',
    version: '1.0.0',
    status: 'healthy'
  })
})

export default app
