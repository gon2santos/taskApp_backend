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
const queue_1 = __importDefault(require('../../db/models/queue'));

const router = (0, express_1.Router)();

router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { projectId, taskId, email } = req.body;
    try {
        yield tasks_1.default.findOneAndDelete({ _id: taskId })
            .then(() => projects_1.default.findById(projectId))
            .then((project) => {
                project.tasks.pull(taskId);
                return project.save();
            })
            .then(() => queue_1.default.findOne({ user: email })) 
            .then((result) => {
                var aux = result.tasks;
                aux = aux.filter(e => e._id != taskId);
                result.tasks = aux;
                return result;
            })
            .then((newQueue) => newQueue.save())
            .then(() => res.status(200).send({msg: "task delete ok"}));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;