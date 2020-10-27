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
exports.Runner = void 0;
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const lookpath_1 = require("lookpath");
const configuration_1 = require("./configuration");
const terminal_1 = require("./terminal");
const prompt_utils_1 = require("./utils/prompt-utils");
const result_1 = require("./enums/result");
const vscode_1 = require("vscode");
const string_utils_1 = require("./utils/string-utils");
class Runner {
    constructor(file, shouldAskForArgs = false) {
        this.file = file;
        this.shouldAskForArgs = shouldAskForArgs;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.existsSync(this.file.path)) {
                vscode_1.window.showErrorMessage(`"${this.file.path}" doesn't exists!`);
                return result_1.Result.error;
            }
            this.arguments = configuration_1.Configuration.runArgs();
            if (this.shouldAskForArgs) {
                this.arguments = yield prompt_utils_1.promptRunArguments(this.arguments);
            }
            if (configuration_1.Configuration.runInExternalTerminal()) {
                const command = yield this.getExternalCommand();
                if (string_utils_1.isStringNullOrWhiteSpace(command)) {
                    return result_1.Result.error;
                }
                child_process_1.exec(command, { cwd: this.file.directory });
            }
            else {
                yield terminal_1.terminal.runInTerminal(`${terminal_1.getRunPrefix()}"${this.file.executable}" ${this.arguments}`, { name: 'C/C++ Compile Run', cwd: this.file.directory });
            }
            return result_1.Result.success;
        });
    }
    getExternalCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (process.platform) {
                case 'win32':
                    return `start cmd /c ".\\\"${this.file.executable}\" ${this.arguments} & echo. & pause"`;
                case 'darwin':
                    return `osascript -e 'do shell script "open -a Terminal " & "${this.file.directory}"' -e 'delay 0.3' -e `
                        + `'tell application "Terminal" to do script ("./" & "${this.file.executable}") in first window'`;
                case 'linux':
                    const linuxTerminal = configuration_1.Configuration.linuxTerminal();
                    if (string_utils_1.isStringNullOrWhiteSpace(linuxTerminal)
                        || string_utils_1.isStringNullOrWhiteSpace(yield lookpath_1.lookpath(linuxTerminal))) {
                        vscode_1.window.showErrorMessage(`${terminal_1.terminal} not found! Try to enter a valid terminal in 'terminal.external.linuxExec' `
                            + `settings!(gnome - terminal, xterm, konsole)`);
                        return undefined;
                    }
                    switch (linuxTerminal) {
                        case 'xterm':
                            return `${linuxTerminal} -T ${this.file.title} -e './"${this.file.executable}" ${this.arguments}; `
                                + `echo; read -n1 -p "Press any key to continue..."'`;
                        case 'gnome-terminal':
                        case 'tilix':
                        case 'mate-terminal':
                            return `${linuxTerminal} -t ${this.file.title} -x bash -c './"${this.file.executable}" ${this.arguments}; `
                                + `echo; read -n1 -p "Press any key to continue..."'`;
                        case 'xfce4-terminal':
                            return `${linuxTerminal} --title ${this.file.title} -x bash -c './"${this.file.executable}" ${this.arguments}; `
                                + `read -n1 -p "Press any key to continue..."'`;
                        case 'konsole':
                            return `${linuxTerminal} -p tabtitle='${this.file.title}' --noclose -e bash -c './"${this.file.executable}" `
                                + `${this.arguments}'`;
                        case 'io.elementary.terminal':
                            return `${linuxTerminal} -e './"${this.file.executable}" ${this.arguments}'`;
                        default:
                            vscode_1.window.showErrorMessage(`${linuxTerminal} isn't supported! Try to enter a supported terminal in `
                                + `'terminal.external.linuxExec' settings! (gnome-terminal, xterm, konsole)`);
                            return undefined;
                    }
                default:
                    vscode_1.window.showErrorMessage('Unsupported platform!');
                    return undefined;
            }
        });
    }
}
exports.Runner = Runner;
//# sourceMappingURL=runner.js.map