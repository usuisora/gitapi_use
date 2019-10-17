"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
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
