"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup called sucessfullly");
    console.log(req.body.email);
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = yield userModel_1.default.findOne({ email });
        if (oldUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const result = yield userModel_1.default.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });
        const token = jsonwebtoken_1.default.sign({ email, password }, "secret", {
            expiresIn: "1h",
        });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const oldUser = yield userModel_1.default.findOne({ email });
        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ email, password }, "secret", {
            expiresIn: "1h",
        });
        res.status(200).json({ token, oldUser });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signin = signin;
//# sourceMappingURL=userController.js.map