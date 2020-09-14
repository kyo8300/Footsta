"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const test_1 = require("./resolvers/test");
const user_1 = require("./resolvers/user");
const User_1 = require("./entity/User");
const path_1 = __importDefault(require("path"));
async function main() {
    const connectionOptions = await typeorm_1.getConnectionOptions();
    Object.assign(connectionOptions, {
        migrations: [path_1.default.join(__dirname, './migration/*')],
        entities: [User_1.User],
    });
    await typeorm_1.createConnection(connectionOptions).catch((err) => console.error(err));
    const app = express_1.default();
    const PORT = 4000;
    const schema = await type_graphql_1.buildSchema({
        resolvers: [test_1.TestResolver, user_1.UserResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
    });
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map