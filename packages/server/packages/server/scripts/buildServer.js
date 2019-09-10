"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const app_root_path_1 = __importDefault(require("app-root-path"));
console.log('test');
fs_extra_1.default.copyFileSync(`${app_root_path_1.default.path}/src/server/views/api.hbs`, `${app_root_path_1.default.path}/dist2/`);
//# sourceMappingURL=buildServer.js.map