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
const currProject_1 = __importDefault(require('../../db/models/currProject'));
const router = (0, express_1.Router)();

router.put("/current", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { num } = req.body;
    try {
        yield currProject_1.default.findOne()
        .then(currProj => {
            currProj.num = num
            return currProj
        })
        .then(result => result.save())
        .then(savedProj => res.status(200).send(savedProj))
        .catch(err => 
            {
                console.log(err)
                res.status(500).send(err);
            })   
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;