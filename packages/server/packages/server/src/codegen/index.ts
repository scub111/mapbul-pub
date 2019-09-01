import { Project, StructureKind } from 'ts-morph';
import appRootPath from 'app-root-path';

const project = new Project({
  tsConfigFilePath: `${appRootPath.path}/tsconfig.json`,
});

project.addExistingSourceFiles('src/**/*.ts');

const interfaceShotName = `Article`;
const interfaceFullName = `I${interfaceShotName}DTO`;
const fileName = `src/${interfaceShotName.toLowerCase()}.dto.ts`;
// add source files
const myInterfaceFile = project.createSourceFile(fileName, {
    statements: [{
        kind: StructureKind.Interface,
        name: interfaceFullName,
        isExported: true,
        properties: [{ name: 'id', type: 'string'}],
    }],
}, { overwrite: true });

project.save();
