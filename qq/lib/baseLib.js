"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arraysDiff(first, second) {
    return first.filter((e) => !second.includes(e));
}
exports.arraysDiff = arraysDiff;
exports.delay = ms => new Promise(resolve => setTimeout(resolve, ms));
