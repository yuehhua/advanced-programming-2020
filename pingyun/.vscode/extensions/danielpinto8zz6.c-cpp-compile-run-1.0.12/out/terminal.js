"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
exports.terminal = exports.getRunPrefix = exports.toWinPath = exports.toWslPath = void 0;
const fse = require("fs-extra");
const path = require("path");
const vscode = require("vscode");
const output_channel_1 = require("./output-channel");
const cp_utils_1 = require("./utils/cp-utils");
var ShellType;
(function (ShellType) {
    ShellType["CMD"] = "Command Prompt";
    ShellType["POWERSHELL"] = "PowerShell";
    ShellType["GIT_BASH"] = "Git Bash";
    ShellType["WSL"] = "WSL Bash";
    ShellType["OTHERS"] = "Others";
})(ShellType || (ShellType = {}));
class Terminal {
    constructor() {
        this.terminals = {};
    }
    runInTerminal(command, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultOptions = { addNewLine: true, name: 'C/C++ Compile Run' };
            const { addNewLine, name, cwd, workspaceFolder } = Object.assign(defaultOptions, options);
            if (this.terminals[name] === undefined) {
                // Open terminal in workspaceFolder if provided
                // See: https://github.com/microsoft/vscode-maven/issues/467#issuecomment-584544090
                const terminalCwd = workspaceFolder ? workspaceFolder.uri : undefined;
                const env = Object.assign({}, options.env);
                this.terminals[name] = vscode.window.createTerminal({ name, env, cwd: terminalCwd });
                // Workaround for WSL custom envs.
                // See: https://github.com/Microsoft/vscode/issues/71267
                if (currentWindowsShell() === ShellType.WSL) {
                    setupEnvForWSL(this.terminals[name], env);
                }
            }
            this.terminals[name].show();
            if (cwd) {
                this.terminals[name].sendText(yield getCDCommand(cwd), true);
            }
            this.terminals[name].sendText(getCommand(command), addNewLine);
            return this.terminals[name];
        });
    }
    // To Refactor: remove from here.
    formattedPathForTerminal(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.platform !== 'win32') {
                return filepath;
            }
            switch (currentWindowsShell()) {
                case ShellType.WSL:
                    return yield toWslPath(filepath);
                case ShellType.POWERSHELL: {
                    // On Windows, append .cmd for `path/to/mvn` to prevent popup window
                    // See: https://github.com/microsoft/vscode-maven/pull/494#issuecomment-633869294
                    if (path.extname(filepath) === '') {
                        const amended = `${filepath}.cmd`;
                        if (yield fse.pathExists(amended)) {
                            return amended;
                        }
                    }
                    return filepath;
                }
                default:
                    return filepath;
            }
        });
    }
    dispose(terminalName) {
        if (terminalName === undefined) { // If the name is not passed, dispose all.
            Object.keys(this.terminals).forEach((id) => {
                this.terminals[id].dispose();
                delete this.terminals[id];
            });
        }
        else if (this.terminals[terminalName] !== undefined) {
            this.terminals[terminalName].dispose();
            delete this.terminals[terminalName];
        }
    }
}
function getCommand(cmd) {
    if (currentWindowsShell() === ShellType.POWERSHELL) {
        return `& ${cmd}`;
    }
    else {
        return cmd;
    }
}
function getCDCommand(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform === 'win32') {
            switch (currentWindowsShell()) {
                case ShellType.GIT_BASH:
                    return `cd "${cwd.replace(/\\+$/, '')}"`; // Git Bash: remove trailing '\'
                case ShellType.POWERSHELL:
                    // Escape '[' and ']' in PowerShell
                    // See: https://github.com/microsoft/vscode-maven/issues/324
                    const escaped = cwd.replace(/([\[\]])/g, '``$1');
                    return `cd "${escaped}"`; // PowerShell
                case ShellType.CMD:
                    return `cd /d "${cwd}"`; // CMD
                case ShellType.WSL:
                    return `cd "${yield toWslPath(cwd)}"`; // WSL
                default:
                    return `cd "${cwd}"`; // Unknown, try using common one.
            }
        }
        else {
            return `cd "${cwd}"`;
        }
    });
}
function currentWindowsShell() {
    const currentWindowsShellPath = vscode.env.shell;
    const binaryName = path.basename(currentWindowsShellPath);
    switch (binaryName) {
        case 'cmd.exe':
            return ShellType.CMD;
        case 'pwsh.exe':
        case 'powershell.exe':
        case 'pwsh': // pwsh on mac/linux
            return ShellType.POWERSHELL;
        case 'bash.exe':
        case 'wsl.exe':
            if (currentWindowsShellPath.indexOf('Git') > 0) {
                return ShellType.GIT_BASH;
            }
            return ShellType.WSL;
        default:
            return ShellType.OTHERS;
    }
}
function toDefaultWslPath(p) {
    const arr = p.split(':\\');
    if (arr.length === 2) {
        const drive = arr[0].toLowerCase();
        const dir = arr[1].replace(/\\/g, '/');
        return `/mnt/${drive}/${dir}`;
    }
    else {
        return p.replace(/\\/g, '/');
    }
}
function toWslPath(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield cp_utils_1.executeCommand('wsl', ['wslpath', '-u', `"${filepath.replace(/\\/g, '/')}"`])).trim();
        }
        catch (error) {
            output_channel_1.outputChannel.appendLine(error, 'WSL');
            return toDefaultWslPath(filepath);
        }
    });
}
exports.toWslPath = toWslPath;
function toWinPath(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield cp_utils_1.executeCommand('wsl', ['wslpath', '-w', `"${filepath}"`])).trim();
    });
}
exports.toWinPath = toWinPath;
function getRunPrefix() {
    if (process.platform === 'win32') {
        const shell = currentWindowsShell();
        if (shell === ShellType.CMD || shell === ShellType.POWERSHELL) {
            return '.\\';
        }
    }
    return './';
}
exports.getRunPrefix = getRunPrefix;
exports.terminal = new Terminal();
function setupEnvForWSL(term, env) {
    if (term !== undefined) {
        Object.keys(env).forEach(key => {
            term.sendText(`export ${key}="${env[key]}"`, true);
        });
    }
}
//# sourceMappingURL=terminal.js.map