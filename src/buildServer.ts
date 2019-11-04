import appRootPath from 'app-root-path';
import { runSync, copyFileSync, removeDirSync, removeFileSync } from 'scub111-common';

export const buildServer = () => {
  console.log('Build was started');
  console.log('Compiling...');
  const output = runSync(`npm run build:init`);
  console.log(output);
  const srcDir = `${appRootPath.path}/src`;
  const distDir = `${appRootPath.path}/dist`;
  console.log('Files are copying...');
  copyFileSync(`${srcDir}/.env`, `${distDir}/.env`);
  copyFileSync(`${srcDir}/views/api.hbs`, `${distDir}/views/api.hbs`);
  copyFileSync(`${srcDir}/api.txt`, `${distDir}/api.txt`);
  console.log('Cleaning...');
  removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};

buildServer();
