import appRootPath from 'app-root-path';
import { copyFileSync, removeDirSync, removeFileSync } from '../common/fileUtils';
import { runSync } from '../common/processUtils';

const main = () => {
  console.log('Build was started');
  const srcDir = `${appRootPath.path}/src`;
  const distDir = `${appRootPath.path}/dist`;
  console.log('Dist folder is removing...');
  try {
    removeDirSync(`${distDir}/server`);
  } catch (e) {
    console.log(e);
  }
  console.log('Files are copying...');
  copyFileSync(`${srcDir}/server/.env`, `${distDir}/server/.env`);
  copyFileSync(`${srcDir}/server/views/api.hbs`, `${distDir}/server/views/api.hbs`);
  copyFileSync(`${srcDir}/server/api.txt`, `${distDir}/server/api.txt`);
  console.log('Compiling...');
  const output = runSync(`tsc -p ${appRootPath.path}/tsconfig.server-build.json --diagnostics`);
  console.log(output);
  console.log('Cleaning...');
  removeFileSync(`${distDir}/tsconfig.server-build.tsbuildinfo`);
};

main();
