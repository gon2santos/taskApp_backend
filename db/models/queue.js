"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const queueSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    tasks: [{}],
});
exports.default = (0, mongoose_1.model)("Queue", queueSchema);