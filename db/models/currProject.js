"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const currProjectSchema = new mongoose_1.Schema({
    num: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: false,
});
exports.default = (0, mongoose_1.model)("CurrProject", currProjectSchema);