import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: '../server/swagger.json',
    output: {
      target: './src/http/generated/api.ts',
      httpClient: 'fetch',
      client: 'fetch',
      baseUrl: 'http://localhost:3333'
    }
  }
})
