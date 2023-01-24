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
const { JsonWebTokenError } = require("jsonwebtoken");
const projects_1 = __importDefault(require('../../db/models/projects'));
const router = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


function AuthToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
        if(err) return res.sendStatus(403);
        req.email = email;
        next()
    })
}


router.post("/all", AuthToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {

    const { email } = req.body;

    console.log(`Got this email: ${email}`);

    try {
        yield projects_1.default.find({user: email})
            .populate("tasks", "name")
            .then((projects) => {
                res.status(200).send(projects)});
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;