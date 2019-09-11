"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const fileUtils_1 = require("../common/fileUtils");
const processUtils_1 = require("../common/processUtils");
const main = () => {
    console.log('Build was started 2');
    const srcDir = `${app_root_path_1.default.path}/src/server`;
    const distDir = `${app_root_path_1.default.path}/dist/server`;
    console.log('Dist folder is removing...');
    fileUtils_1.removeDirSync(distDir);
    console.log('Files are copying...');
    fileUtils_1.copyFileSync(`${srcDir}/.env`, `${distDir}/.env`);
    fileUtils_1.copyFileSync(`${srcDir}/views/api.hbs`, `${distDir}/views/api.hbs`);
    fileUtils_1.copyFileSync(`${srcDir}/api.txt`, `${distDir}/api.txt`);
    console.log('Compiling...');
    const output = processUtils_1.runSync(`tsc -p ${app_root_path_1.default.path}/tsconfig.server-build.json --diagnostics`);
    console.log(output);
    console.log('Cleaning...');
    fileUtils_1.removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};
main();
//# sourceMappingURL=buildServer.js.map