"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const Project_1 = __importDefault(require("./Project"));
class RatedProject extends Project_1.default {
    constructor(name, stars) {
        super(name);
        this.stars = stars;
    }
    static isTypeEqual(obj) {
        return _.isEqual(Object.keys(obj), ["name", "stars"]);
    }
}
exports.default = RatedProject;
