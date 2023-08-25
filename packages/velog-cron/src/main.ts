import 'reflect-metadata'

import { ENV } from '@env'
import { disableKeepAlive } from '@plugins/encapsulated/closePlugin.js'
import app from './app.js'
import { container } from 'tsyringe'
import { DbService } from '@lib/db/DbService.js'

async function main() {
  app.listen({ port: ENV.port })
  const dbService = container.resolve(DbService)

  await dbService.$connect()

  console.info(`INFO: Database connected to "${ENV.databaseUrl}"`)
  process.on('SIGINT', async () => {
    disableKeepAlive()
    process.exit(0)
  })
}

main()