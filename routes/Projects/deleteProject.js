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
const projects_1 = __importDefault(require("../../db/models/projects"));
const currProject_1 = __importDefault(require('../../db/models/currProject'));
const tasks_1 = __importDefault(require("../../db/models/tasks"));

const router = (0, express_1.Router)();

router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { projectId } = req.body;
    var tasksIds = [];
    try {
        yield projects_1.default.findById(projectId)
            .then(proj => tasks_1.default.deleteMany({ _id: { $in: proj.tasks } }))
            .then(() => projects_1.default.deleteOne({ _id: projectId }))
            .then(() => currProject_1.default.findOne())
            .then(currProj => {
                currProj.num = 0;
                return currProj
            })
            .then(result => result.save())
            .then(() => res.status(200).send(`Project deleted`));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;