import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
  ZodTypeProvider
} from 'fastify-type-provider-zod'
import { routes } from './routes'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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
  },
  transform: jsonSchemaTransform
})

app.register(routes)

app.register(fastifySwaggerUi, {
  routePrefix: 'docs'
})

/** server */
app.listen({ port: 3333 }).then(() => {
  console.log('🚀 HTTP Server is running!')
})

app.ready().then(() => {
  const spec = app.swagger()

  writeFile(resolve(__dirname, 'swagger.json'), JSON.stringify(spec, null, 2), 'utf8')
})