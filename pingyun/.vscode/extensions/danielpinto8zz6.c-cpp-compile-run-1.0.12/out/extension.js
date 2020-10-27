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
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const terminal_1 = require("./terminal");
const compile_run_manager_1 = require("./compile-run-manager");
function activate(context) {
    const compileRunManager = new compile_run_manager_1.CompileRunManager();
    const compile = vscode_1.commands.registerCommand('extension.Compile', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.compile();
    }));
    const run = vscode_1.commands.registerCommand('extension.Run', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.run();
    }));
    const compileRun = vscode_1.commands.registerCommand('extension.CompileRun', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.compileRun();
    }));
    const customCompile = vscode_1.commands.registerCommand('extension.CustomCompile', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.compile(true);
    }));
    const customRun = vscode_1.commands.registerCommand('extension.CustomRun', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.compile(true);
    }));
    const customCompileRun = vscode_1.commands.registerCommand('extension.CustomCompileRun', () => __awaiter(this, void 0, void 0, function* () {
        yield compileRunManager.compileRun(true, true);
    }));
    context.subscriptions.push(compile);
    context.subscriptions.push(run);
    context.subscriptions.push(compileRun);
    context.subscriptions.push(customCompile);
    context.subscriptions.push(customRun);
    context.subscriptions.push(customCompileRun);
    // Free resources when manually closing a terminal
    context.subscriptions.push(vscode_1.window.onDidCloseTerminal((closedTerminal) => {
        terminal_1.terminal.dispose(closedTerminal.name);
    }));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map