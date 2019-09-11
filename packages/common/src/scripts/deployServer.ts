import appRootPath from 'app-root-path';
import { copyFileSync, removeDirSync, removeFileSync } from '../common/fileUtils';
import { runSync } from '../common/processUtils';

const main = () => {
  console.log('Building...');
  const output = runSync(`npm run server-build`);
  console.log(output);
  console.log('Copying Web.config...');
  copyFileSync(`${appRootPath.path}/iis/Web.config`, `${appRootPath.path}/Web.config`);
};

main();
