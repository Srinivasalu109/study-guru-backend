"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const addRoute_1 = __importDefault(require("./routes/addRoute"));
const requestRoute_1 = __importDefault(require("./routes/requestRoute"));
const app = (0, express_1.default)();
const PORT = 4000;
const CONNECTION_URL = "mongodb+srv://alla:mongosri123@cluster0.of0yk.mongodb.net/?retryWrites=true&w=majority";
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "30mb" }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", userRoute_1.default);
app.use("/add", addRoute_1.default);
app.use("/request", requestRoute_1.default);
mongoose_1.default
    .connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
//# sourceMappingURL=app.js.map