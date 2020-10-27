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
exports.CompileRunManager = void 0;
const compiler_1 = require("./compiler");
const runner_1 = require("./runner");
const vscode_1 = require("vscode");
const configuration_1 = require("./configuration");
const file_utils_1 = require("./utils/file-utils");
const result_1 = require("./enums/result");
class CompileRunManager {
    compile(shouldAskForInputFlags = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFile();
            if (file === null) {
                return;
            }
            const compiler = new compiler_1.Compiler(file, shouldAskForInputFlags);
            yield compiler.compile();
        });
    }
    run(shouldAskForArgs = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFile();
            if (file === null) {
                return;
            }
            const runner = new runner_1.Runner(file, shouldAskForArgs);
            yield runner.run();
        });
    }
    compileRun(shouldAskForInputFlags = false, shouldAskForArgs = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.getFile();
            if (file === null) {
                return;
            }
            const compiler = new compiler_1.Compiler(file, shouldAskForInputFlags);
            const runner = new runner_1.Runner(file, shouldAskForArgs);
            const compileResult = yield compiler.compile();
            if (compileResult === result_1.Result.success) {
                yield runner.run();
            }
        });
    }
    getFile() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!vscode_1.window || !vscode_1.window.activeTextEditor || !vscode_1.window.activeTextEditor.document) {
                vscode_1.window.showErrorMessage('Invalid document!');
                return null;
            }
            const doc = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
            if ((doc === null || doc === void 0 ? void 0 : doc.isUntitled) && !configuration_1.Configuration.saveBeforeCompile()) {
                vscode_1.window.showErrorMessage('Please save file first then try again!');
                return null;
            }
            return file_utils_1.parseFile(doc);
        });
    }
}
exports.CompileRunManager = CompileRunManager;
//# sourceMappingURL=compile-run-manager.js.map