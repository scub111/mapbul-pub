"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = __importDefault(require("mkdirp"));
exports.makeSureSync = (filePath) => {
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(filePath)) {
        mkdirp_1.default.sync(dir);
    }
};
exports.deleteFileSync = (filePath) => {
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.readFileSync = (filePath) => {
    if (fs_1.default.existsSync(filePath)) {
        return fs_1.default.readFileSync(filePath, 'utf-8');
    }
};
exports.writeFileSync = (filePath, data) => {
    exports.makeSureSync(filePath);
    fs_1.default.writeFileSync(filePath, data, { encoding: 'utf8', flag: 'w' });
};
exports.appendFileSync = (filePath, data) => {
    exports.makeSureSync(filePath);
    fs_1.default.appendFileSync(filePath, data, { encoding: 'utf8' });
};
exports.copyFileSync = (source, destination, flags) => {
    exports.makeSureSync(destination);
    fs_1.default.copyFileSync(source, destination, flags);
};
//# sourceMappingURL=utils.js.map