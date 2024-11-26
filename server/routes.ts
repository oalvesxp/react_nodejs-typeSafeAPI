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

  app.get('/users/:id', {
    schema: {
      tags: ['users'],
      description: 'list an user by id',
      params: z.object({
        id: z.string().uuid()
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string()
        }),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (req, rep) => {
    const { id } = req.params

    const user = users.find((item) => item.id === id)

    if (!user) {
      return rep.status(404).send({ message: 'User not found.' })
    }

    return user
  })

  app.patch('/users/:id', {
    schema: {
      tags: ['users'],
      description: 'update user register',
      params: z.object({
        id: z.string().uuid()
      }),
      body: z.object({
        name: z.string()
      }),
      response: {
        204: z.null(),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (req, rep) => {
    const { id } = req.params
    const userIndex = users.findIndex(item => item.id === id)
    const user = { id, name: req.body.name }

    if (userIndex < 0) {
      return rep.status(404).send({ message: 'User not found.' })
    }

    users[userIndex] = user

    return rep.status(204).send()
  })

  app.delete('/users/:id', {
    schema: {
      tags: ['users'],
      description: 'delete an user by id',
      params: z.object({
        id: z.string().uuid()
      }),
      response: {
        204: z.null(),
        404: z.object({
          message: z.string()
        })
      }
    }
  }, async (req, rep) => {
    const { id } = req.params
    const userIndex = users.findIndex(item => item.id === id)

    if (userIndex < 0) {
      return rep.status(404).send({ message: 'User not Found' })
    }

    users.splice(userIndex, 1)

    return rep.status(204).send()
  })
}