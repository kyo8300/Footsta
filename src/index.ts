import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection, getConnectionOptions } from 'typeorm'
import { buildSchema } from 'type-graphql'
import { TestResolver } from './resolvers/test'
import { UserResolver } from './resolvers/user'
import { User } from './entity/User'
import path from 'path'

async function main() {
  const connectionOptions = await getConnectionOptions()
  Object.assign(connectionOptions, {
    migrations: [path.join(__dirname, './migration/*')],
    entities: [User],
  })

  await createConnection(connectionOptions).catch((err) => console.error(err))

  const app = express()
  const PORT = 4000

  const schema = await buildSchema({
    resolvers: [TestResolver, UserResolver],
  })

  const apolloServer = new ApolloServer({
    schema,
  })

  apolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
})
