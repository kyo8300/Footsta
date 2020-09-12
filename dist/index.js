"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 4000;
app.get('/', (_, res) => {
    res.send('hello world!');
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map