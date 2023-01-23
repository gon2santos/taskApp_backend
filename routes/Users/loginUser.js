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
const express_1 = require("express");
const users_1 = __importDefault(require('../../db/models/users'));
const router = (0, express_1.Router)();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {

    let { email, pwd } = req.body;
    try {
        if (typeof email === "string")
            email = email.toLocaleLowerCase();
        const user = yield users_1.default.findOne({ email: email })
        if (!user) {
            res.status(400).send({ msg: "USER_NOT_FOUND" });
        } else {
            if (yield bcrypt.compare(req.body.pwd, user.pwd)){
                const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET)
                res.send({ msg: "LOGIN_SUCCESS", accessToken: accessToken });
            }
            else
                res.send({ msg: "LOGIN_FAIL" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send();
    }
}));
exports.default = router;