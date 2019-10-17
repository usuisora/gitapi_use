"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
class Project {
    constructor(name) {
        this.name = name;
    }
    static isTypeEqual(obj) {
        return _.isEqual(Object.keys(obj), ["name"]);
    }
}
exports.default = Project;
// import Project from "../classes/Project";
