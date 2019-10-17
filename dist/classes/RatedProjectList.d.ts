import { RatedProject } from "../types";
export default class RatedProjectList {
    value: RatedProject[];
    constructor(value?: RatedProject[]);
    sort: () => RatedProject[];
    top: (to?: number) => void;
}
