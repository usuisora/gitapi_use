"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ratedProjectList {
    constructor(value) {
        this.sort = () => {
            return this.value.sort((a, b) => b.stars - a.stars);
        };
        this.top = (to = 3) => {
            this.sort().slice(0, to);
        };
        this.value = value;
    }
}
