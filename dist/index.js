"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const thread_1 = require("./resolvers/thread");
const response_1 = require("./resolvers/response");
const authChecker_1 = require("./utils/authChecker");
const User_1 = require("./entity/User");
const Thread_1 = require("./entity/Thread");
const Response_1 = require("./entity/Response");
const path_1 = __importDefault(require("path"));
const dataloader_1 = require("./utils/dataloader");
async function main() {
    const connectionOptions = await typeorm_1.getConnectionOptions();
    Object.assign(connectionOptions, {
        migrations: [path_1.default.join(__dirname, './migration/*')],
        entities: [User_1.User, Thread_1.Thread, Response_1.Response],
    });
    await typeorm_1.createConnection(connectionOptions).catch((err) => console.error(err));
    const app = express_1.default();
    const PORT = 4000;
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };
    app.use(cors_1.default(corsOptions));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisClient = new ioredis_1.default();
    app.use(express_session_1.default({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            sameSite: 'lax',
        },
        name: 'userId',
        saveUninitialized: false,
    }));
    const schema = await type_graphql_1.buildSchema({
        resolvers: [user_1.UserResolver, thread_1.ThreadResolver, response_1.ResponseResolver],
        authChecker: authChecker_1.authChecker,
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({
            redis: redisClient,
            session: req.session,
            res,
            userLoader: dataloader_1.createUserLoader,
        }),
        playground: {
            settings: {
                'request.credentials': 'include',
            },
        },
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map