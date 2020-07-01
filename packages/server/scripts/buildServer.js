'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_root_path_1 = __importDefault(require('app-root-path'));
const scub111_common_1 = require('scub111-common');
exports.buildServer = () => {
  console.log('Build was started');
  console.log('Compiling...');
  const output = scub111_common_1.runSync(`npm run build:init`);
  console.log(output);
  const srcDir = `${app_root_path_1.default.path}/src`;
  const distDir = `${app_root_path_1.default.path}/dist`;
  console.log('Files are copying...');
  scub111_common_1.copyFileSync(`${srcDir}/.env`, `${distDir}/.env`);
  scub111_common_1.copyFileSync(`${srcDir}/views/api.hbs`, `${distDir}/views/api.hbs`);
  scub111_common_1.copyFileSync(`${srcDir}/views/401.hbs`, `${distDir}/views/401.hbs`);
  scub111_common_1.copyFileSync(`${srcDir}/views/403.hbs`, `${distDir}/views/403.hbs`);
  scub111_common_1.copyFileSync(`${srcDir}/views/404.hbs`, `${distDir}/views/404.hbs`);
  scub111_common_1.copyFileSync(`${srcDir}/api.txt`, `${distDir}/api.txt`);
  console.log('Cleaning...');
  scub111_common_1.removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};
exports.buildServer();
