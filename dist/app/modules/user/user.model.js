"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    wishList: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Book",
            default: [],
        },
    ],
    reading: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Book",
            default: [],
        },
    ],
    finished: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Book",
            default: [],
        },
    ],
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
