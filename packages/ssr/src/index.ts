import { generateControllers } from 'codegen/generateControllers';

// import appRootPath from 'app-root-path';
// import { GlobalVar } from '@mapbul-pub/common';
// const path = `${appRootPath}/.env`;
// console.log(path);
// GlobalVar.setup(path);

export * from './routerStorage';
export * from './generateControllers';

// generateControllers();

export const test = () => {
  console.log('test 123');
};


console.log('index from codegen 3.4');
