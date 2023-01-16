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
const e = require("express");
const express_1 = require("express");
const projects_1 = __importDefault(require('../../db/models/projects'));
const router = (0, express_1.Router)();

router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield projects_1.default.find()
            .populate("tasks", "name").lean()
            .then((projects) => {
                var orderedQueue = [];
                var e = 0;
                var i = 0;
                var hasTasksinlevel = true;
                while (hasTasksinlevel) {
                    hasTasksinlevel = false;
                    for (i = 0; i < projects.length; i++) {
                        if (projects[i].tasks[e]) {
                            var obj = projects[i].tasks[e];
                            obj.proj_id = projects[i]._id;
                            orderedQueue.push(obj);
                            hasTasksinlevel = true;
                        }
                    }
                    e++;
                }
                return orderedQueue;
            })
            .then((result) => res.status(200).send(result))
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;