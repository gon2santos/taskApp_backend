"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();

/* ============PRODUCTS FILES============ */
const postProjects_1 = __importDefault(require("./Projects/postProjects"));
const getProjects_1 = __importDefault(require("./Projects/getProjects"));
const postTasks_1 = __importDefault(require("./Tasks/postTasks"));


/* ============PRODUCTS============ */
router.use("/projects", postProjects_1.default);
router.use("/projects", getProjects_1.default);
router.use("/tasks", postTasks_1.default);

exports.default = router;