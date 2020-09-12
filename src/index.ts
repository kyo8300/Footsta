import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TestResolver } from './resolvers/test'

const main = async () => {
  const app = express()
  const PORT = 4000

  const schema = await buildSchema({
    resolvers: [TestResolver],
  })

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
  })

  apolloServer.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
  })
}

main()
