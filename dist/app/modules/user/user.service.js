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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: userData.email });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Email must be unique.");
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getUsersService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    const result = yield user_model_1.User.find({ email: email }).populate("wishList");
    console.log(result);
    return result;
});
const updateUserService = (email, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: email });
    if (!isExist || !email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You are not othenticated.");
    }
    //for wish list
    if (updatedData.wishList) {
        const wishList = updatedData.wishList;
        const result = yield user_model_1.User.updateOne({ email: email }, {
            $addToSet: { wishList: { $each: wishList } },
            $pull: { reading: { $in: [wishList] }, finished: { $in: [wishList] } },
        }, {
            new: true,
        });
        return result;
    }
    // for reading
    if (updatedData.reading) {
        const reading = updatedData.reading;
        const result = yield user_model_1.User.updateOne({ email: email }, {
            $addToSet: { reading: { $each: reading } },
            $pullAll: { wishList: reading, finished: reading },
        }, {
            new: true,
        });
        return result;
    }
    //for finished
    if (updatedData.finished) {
        const finished = updatedData.finished;
        const result = yield user_model_1.User.updateOne({ email: email }, {
            $addToSet: { finished: { $each: finished } },
            $pullAll: { reading: finished, wishList: finished },
        }, {
            new: true,
        });
        return result;
    }
});
exports.UserService = {
    createUserService,
    getUsersService,
    updateUserService,
};
