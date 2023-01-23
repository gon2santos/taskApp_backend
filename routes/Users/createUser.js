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

router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {

    let { email, pwd } = req.body;
    try {
        if (typeof email === "string")
            email = email.toLocaleLowerCase();
        yield bcrypt.hash(pwd, 10)
            .then((hashedPwd) => {
                return new users_1.default({
                    email: email,
                    pwd: hashedPwd,
                    confirmedEmail: false,
                    banned: false
                })
            })
            .then(user => user.save())
            .then(savedUser => res.status(200).send({ msg: "user created" }))
            .catch((err) => {
                console.log(err);
                res.status(500).send(err);
            })
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;