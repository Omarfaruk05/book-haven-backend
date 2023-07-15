"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorEmail: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationTime: {
        type: Date,
        required: true,
    },
    reviews: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
