"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();

/* ============PRODUCTS FILES============ */
const postProjects_1 = __importDefault(require("./Projects/postProjects"));
const deleteProjects_1 = __importDefault(require("./Projects/deleteProject"));
const getProjects_1 = __importDefault(require("./Projects/getProjects"));
const getCurrProject_1 = __importDefault(require("./Projects/getCurrentProject"));
const putCurrProject_1 = __importDefault(require("./Projects/putCurrentProject"));
const createCurrProject_1 = __importDefault(require("./Projects/createCurrProj"));
const renameProject_1 = __importDefault(require("./Projects/renameProject"));
const postTasks_1 = __importDefault(require("./Tasks/postTasks"));
const getTasks_1 = __importDefault(require("./Tasks/getTasks"));
const checkTask_1 = __importDefault(require("./Tasks/checkTask"));
const renameTask_1 = __importDefault(require("./Tasks/renameTask"));
const deleteTask_1 = __importDefault(require("./Tasks/deleteTask"));
const getQueue_1 = __importDefault(require("./Queue/getQueue"));


/* ============PRODUCTS============ */
router.use("/projects", postProjects_1.default);
router.use("/projects", getProjects_1.default);
router.use("/projects", getCurrProject_1.default);
router.use("/projects", putCurrProject_1.default);
router.use("/projects", createCurrProject_1.default);
router.use("/projects", deleteProjects_1.default);
router.use("/projects", renameProject_1.default);
router.use("/tasks", postTasks_1.default);
router.use("/tasks", getTasks_1.default);
router.use("/tasks", checkTask_1.default);
router.use("/tasks", renameTask_1.default);
router.use("/tasks", deleteTask_1.default);
router.use("/queue", getQueue_1.default);

exports.default = router;