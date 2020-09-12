"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const test_1 = require("./resolvers/test");
const main = async () => {
    const app = express_1.default();
    const PORT = 4000;
    const schema = await type_graphql_1.buildSchema({
        resolvers: [test_1.TestResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        playground: true,
    });
    apolloServer.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map