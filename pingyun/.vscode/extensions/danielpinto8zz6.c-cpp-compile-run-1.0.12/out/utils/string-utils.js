"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringNullOrWhiteSpace = void 0;
function isStringNullOrWhiteSpace(str) {
    return str === undefined || str === null
        || typeof str !== 'string'
        || str.match(/^ *$/) !== null;
}
exports.isStringNullOrWhiteSpace = isStringNullOrWhiteSpace;
//# sourceMappingURL=string-utils.js.map