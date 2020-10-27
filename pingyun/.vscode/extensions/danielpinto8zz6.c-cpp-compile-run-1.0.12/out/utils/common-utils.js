"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProccessRunning = exports.commandExists = void 0;
const find = require("find-process");
const lookpath_1 = require("lookpath");
const string_utils_1 = require("./string-utils");
function commandExists(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield lookpath_1.lookpath(command);
        return string_utils_1.isStringNullOrWhiteSpace(result) ? true : false;
    });
}
exports.commandExists = commandExists;
function isProccessRunning(proccess) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield find('name', proccess, true);
        return list.length > 0;
    });
}
exports.isProccessRunning = isProccessRunning;
//# sourceMappingURL=common-utils.js.map