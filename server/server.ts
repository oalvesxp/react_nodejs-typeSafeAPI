import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'

const app = fastify()

/** registers */
app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'typed full-stack',
      version: '1.0.0'
    }
  }
})

app.register(fastifySwaggerUi, {
  routePrefix: 'docs'
})

/** routes */
app.get('/', (_, rep) => rep.status(200).send({ hello: 'world' }))

/** server */
app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP Server is running!')
})