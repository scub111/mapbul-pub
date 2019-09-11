"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const fileUtils_1 = require("../common/fileUtils");
const processUtils_1 = require("../common/processUtils");
const bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    console.log('Build was started');
    const srcDir = `${app_root_path_1.default.path}/src`;
    const distDir = `${app_root_path_1.default.path}/dist`;
    console.log('Dist folder is removing...');
    fileUtils_1.removeDirSync(distDir);
    console.log('Files are copying...');
    fileUtils_1.copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/api.hbs`);
    console.log('Compiling...');
    const output = yield processUtils_1.runAsync(`tsc -p ${app_root_path_1.default.path}/tsconfig.server-build.json --diagnostics`);
    console.log(output);
});
bootstrap();
//# sourceMappingURL=buildServer.js.map