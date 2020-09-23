import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createConnection, getConnectionOptions } from 'typeorm'
import cors from 'cors'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/user'
import { ThreadResolver } from './resolvers/thread'
import { authChecker } from './utils/authChecker'
import { User } from './entity/User'
import { Thread } from './entity/Thread'
import path from 'path'

async function main() {
  // Typeorm connects to Postgres
  const connectionOptions = await getConnectionOptions()
  Object.assign(connectionOptions, {
    migrations: [path.join(__dirname, './migration/*')],
    entities: [User, Thread],
  })
  await createConnection(connectionOptions).catch((err) => console.error(err))

  const app = express()
  const PORT = 4000

  // CORS between client(3000) and server(4000)
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.use(cors(corsOptions))

  // Store user login session in Redis
  const RedisStore = connectRedis(session)
  const redisClient = new Redis()
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.COOKIE_SECRET as string,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        sameSite: 'lax',
        // secure: true
      },
      name: 'userId',
      saveUninitialized: false,
    })
  )

  // TypeGraphQL resolvers
  const schema = await buildSchema({
    resolvers: [UserResolver, ThreadResolver],
    authChecker,
  })

  // Resolvers and Context connet to Apollo Server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      redis: redisClient,
      session: req.session,
      res,
    }),
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
  })
  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main().catch((err) => {
  console.error(err)
})
