"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const mongoose_1 = __importDefault(require("mongoose"));
const main_routes_1 = __importDefault(require("./routes/main.routes"));
const PORT = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const server = express_1.default();
server.use(express_1.default.json());
const startServer = async () => {
    try {
        await app.prepare();
        await mongoose_1.default.connect('mongodb+srv://dmitriykomis:dmitriy123qwe@cluster0.ilgc5.mongodb.net/blog');
        server.use('/api/posts', main_routes_1.default);
        server.get('*', (req, res) => {
            return handle(req, res);
        });
        server.listen(PORT, (err) => {
            if (err)
                throw err;
            // tslint:disable-next-line:no-console
            console.log(` Ready on port ${PORT}`);
        });
    }
    catch (ex) {
        // tslint:disable-next-line:no-console
        console.error(ex.stack);
        process.exit(1);
    }
};
startServer();
// await mongoose.connect('mongodb+srv://dmitriykomis:dmitriy123qwe@cluster0.ilgc5.mongodb.net/blog')
//# sourceMappingURL=index.js.map