import { Project, StructureKind, OptionalKind, PropertySignatureStructure } from 'ts-morph';
import { IField } from './IField';
import appRootPath from 'app-root-path';
import handlebars from 'handlebars';
import fs from 'fs';

export const createDTO = (folder: string, name: string, fields: IField[]) => {
  const fullName = `I${name}DTO`;
  const fileName = `src/server/${folder}/${name.toLowerCase()}.dto.ts`;
  // const properties: Array<OptionalKind<PropertySignatureStructure>> = fields.map(i => ({name: i.field, type: i.type}));
  // const myInterfaceFile = project.createSourceFile(fileName, {
  //   statements: [{
  //       kind: StructureKind.Interface,
  //       name: fullName,
  //       isExported: true,
  //       properties,
  //   }],
  // }, { overwrite: true });
  // return myInterfaceFile;

  const data = {
    title: 'practical node.js',
    author: '@azat_co',
    fields,
  };
  const source = fs.readFileSync(`${appRootPath.path}/src/codegen/dto.hbs`, 'utf-8');
  const template = handlebars.compile(source);
  const html = template(data);
};
