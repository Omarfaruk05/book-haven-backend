"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required.",
        }),
        author: zod_1.z.string({
            required_error: "Author is required.",
        }),
        authorEmail: zod_1.z.string({
            required_error: "Author email is required.",
        }),
        genre: zod_1.z.string({
            required_error: "Genre is required.",
        }),
        reviews: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
};
