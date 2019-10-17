"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RatedProjectList {
    constructor(value) {
        this.sort = () => {
            return this.value.sort((a, b) => b.stars - a.stars);
        };
        this.top = (to = 3) => {
            this.sort().slice(0, to);
        };
        // if(!value){
        //   let
        // }
        this.value = value;
    }
}
exports.default = RatedProjectList;
