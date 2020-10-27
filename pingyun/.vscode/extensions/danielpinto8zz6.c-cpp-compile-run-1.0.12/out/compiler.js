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
exports.Compiler = void 0;
const child_process_1 = require("child_process");
const vscode_1 = require("vscode");
const configuration_1 = require("./configuration");
const file_type_1 = require("./enums/file-type");
const output_channel_1 = require("./output-channel");
const prompt_utils_1 = require("./utils/prompt-utils");
const common_utils_1 = require("./utils/common-utils");
const result_1 = require("./enums/result");
const string_utils_1 = require("./utils/string-utils");
class Compiler {
    constructor(file, shouldAskForInputFlags = false) {
        this.file = file;
        this.shouldAskForInputFlags = shouldAskForInputFlags;
    }
    compile() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const setCompilerResult = this.setCompiler();
            if (setCompilerResult === result_1.Result.error) {
                return result_1.Result.error;
            }
            if (configuration_1.Configuration.saveBeforeCompile()) {
                yield ((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.save());
            }
            if (yield common_utils_1.isProccessRunning(this.file.executable)) {
                vscode_1.window.showErrorMessage(`${this.file.executable} is already runing! Please close it first to compile successfully!`);
                return result_1.Result.error;
            }
            if (!this.isCompilerValid(this.compiler)) {
                yield this.compilerNotFound();
                return result_1.Result.error;
            }
            if (this.shouldAskForInputFlags) {
                const flags = yield prompt_utils_1.promptFlags(this.inputFlags);
                if (!string_utils_1.isStringNullOrWhiteSpace(flags)) {
                    this.inputFlags = flags;
                }
            }
            let compilerArgs = [`"${this.file.name}"`, '-o', `"${this.file.executable}"`];
            if (this.inputFlags) {
                compilerArgs = compilerArgs.concat(this.inputFlags.split(' '));
            }
            const proccess = child_process_1.spawnSync(`"${this.compiler}"`, compilerArgs, { cwd: this.file.directory, shell: true, encoding: 'utf-8' });
            if (proccess.output.length > 0) {
                output_channel_1.outputChannel.appendLine(proccess.output.toLocaleString(), this.file.name);
            }
            if (proccess.status === 0) {
                vscode_1.window.showInformationMessage('Compiled successfuly!');
            }
            else {
                output_channel_1.outputChannel.show();
                vscode_1.window.showErrorMessage('Error compiling!');
                return result_1.Result.error;
            }
            return result_1.Result.success;
        });
    }
    setCompiler() {
        switch (this.file.type) {
            case file_type_1.FileType.c: {
                this.compiler = configuration_1.Configuration.cCompiler();
                this.inputFlags = configuration_1.Configuration.cFlags();
                return result_1.Result.success;
            }
            case file_type_1.FileType.cplusplus: {
                this.compiler = configuration_1.Configuration.cppCompiler();
                this.inputFlags = configuration_1.Configuration.cppFlags();
                return result_1.Result.success;
            }
            default: {
                vscode_1.window.showErrorMessage('Invalid File!');
                return result_1.Result.error;
            }
        }
    }
    isCompilerValid(compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            return !string_utils_1.isStringNullOrWhiteSpace(compiler) && (yield common_utils_1.commandExists(compiler));
        });
    }
    compilerNotFound() {
        return __awaiter(this, void 0, void 0, function* () {
            const CHANGE_PATH = 'Change path';
            const choiceForDetails = yield vscode_1.window.showErrorMessage('Compiler not found, try to change path in settings!', CHANGE_PATH);
            if (choiceForDetails === CHANGE_PATH) {
                this.compiler = (yield prompt_utils_1.promptCompiler());
                if (yield this.isCompilerValid(this.compiler)) {
                    yield configuration_1.Configuration.setCompiler(this.compiler, this.file.type);
                }
                else {
                    vscode_1.window.showErrorMessage('Compiler not found!');
                }
            }
            else {
                vscode_1.window.showErrorMessage('Compiler not set!');
            }
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=compiler.js.map