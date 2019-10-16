export const objectToQuery = (query: object): string => {
    return Object.entries(query).reduce((sum, nex) => {
        return nex[1] != "" ? (sum += nex[0] + "=" + nex[1] + " ") : sum;
    }, "");
}