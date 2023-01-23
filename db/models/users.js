"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    banned: {
        type: Boolean,
        required: true,
    },
    confirmedEmail: {
        type: Boolean,
        required: true,
    },
    projects: [
        {
            required: false,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
}, {
    versionKey: false,
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", userSchema);