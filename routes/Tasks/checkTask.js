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

router.delete("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { projectId, taskId, projQtty } = req.body;
    try {
        yield tasks_1.default.findOneAndDelete({ _id: taskId })
            .then(() => currProject_1.default.findOne())
            .then(currProj => {
                if (currProj.num + 1 === projQtty)
                    currProj.num = 0;
                else
                    currProj.num = currProj.num + 1
                return currProj
            })
            .then(result => result.save())
            .then(() => projects_1.default.findById(projectId))
            .then((project) => {
                project.tasks.pull(taskId);
                return project.save();
            })
            .then((savedProject) => res.status(200).send(savedProject));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;