import { randomUUID } from 'crypto'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

interface User {
  id: string
  name: string
}

const users: User[] = []

export const routes: FastifyPluginAsyncZod = async (app) => {
  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'register users',
      body: z.object({
        name: z.string()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (req, rep) => {
    const { name } = req.body

    users.push({
      id: randomUUID(),
      name
    })

    return rep.status(201).send()

  })

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