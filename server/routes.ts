import { FastifyInstance } from 'fastify'
import z from 'zod'

interface User {
  id: string
  name: string
}

const users: User[] = []

export async function routes(app: FastifyInstance) {
  app.get('/users', {
    schema: {
      tags: ['users'],
      description: 'list users',
      response: {
        200: z.array(
          z.object({
            id: z.string(),
            name: z.string()
          })
        )
      }
    }
  }, (_, rep) => {
    return users
  })

}