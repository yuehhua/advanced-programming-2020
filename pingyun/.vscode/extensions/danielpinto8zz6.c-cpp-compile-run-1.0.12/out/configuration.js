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
exports.Configuration = void 0;
const vscode_1 = require("vscode");
const file_type_1 = require("./enums/file-type");
class Configuration {
    static getSetting(name) {
        return vscode_1.workspace.getConfiguration('c-cpp-compile-run', null).get(name);
    }
    static cCompiler() {
        var _a;
        return (_a = this.getSetting('c-compiler')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static cFlags() {
        var _a;
        return (_a = this.getSetting('c-flags')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static cppCompiler() {
        var _a;
        return (_a = this.getSetting('cpp-compiler')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static cppFlags() {
        var _a;
        return (_a = this.getSetting('cpp-flags')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static saveBeforeCompile() {
        return this.getSetting('save-before-compile');
    }
    static runArgs() {
        var _a;
        return (_a = this.getSetting('run-args')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static runInExternalTerminal() {
        return this.getSetting('run-in-external-terminal');
    }
    static defaultWindowsShell() {
        var _a;
        return (_a = vscode_1.workspace.getConfiguration('terminal').get('integrated.shell.windows')) === null || _a === void 0 ? void 0 : _a.trim();
    }
    static linuxTerminal() {
        return vscode_1.workspace.getConfiguration().get('terminal.external.linuxExec');
    }
    static setCompiler(compiler, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = type === file_type_1.FileType.c ? 'c-compiler' : 'cpp-compiler';
            yield vscode_1.workspace.getConfiguration('c-cpp-compile-run', null).update(key, compiler, vscode_1.ConfigurationTarget.Global);
        });
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map