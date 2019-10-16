"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToQuery = (query) => {
    return Object.entries(query).reduce((sum, nex) => {
        return nex[1] != "" ? (sum += nex[0] + "=" + nex[1] + " ") : sum;
    }, "");
};
