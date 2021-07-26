import {ResponseHeader} from "../../../interface";

export const getHeaderMap = (header: string): ResponseHeader => {

    // Create a map of header names to values
    const headerMap = {};

    // Convert the header string into an array
    // of individual headers
    const arr = header.trim().split(/[\r\n]+/);

    arr.forEach( (line) => {
        const parts = line.split(': ');
        const header = parts.shift();
        headerMap[header] = parts.join(': ');
    });
    return headerMap
}