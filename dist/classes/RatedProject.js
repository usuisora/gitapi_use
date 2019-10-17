"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Project_1 = require("./Project");
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
