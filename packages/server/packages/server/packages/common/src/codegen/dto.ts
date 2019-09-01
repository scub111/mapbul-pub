import { Project, StructureKind, OptionalKind, PropertySignatureStructure } from 'ts-morph';
import { IField } from './IField';

export const createDTO = (project: Project, folder: string, name: string, fields: IField[]) => {
  const fullName = `I${name}DTO`;
  const fileName = `src/server/${folder}/${name.toLowerCase()}.dto.ts`;
  const properties: Array<OptionalKind<PropertySignatureStructure>> = fields.map(i => ({name: i.name, type: i.type}));
  const myInterfaceFile = project.createSourceFile(fileName, {
    statements: [{
        kind: StructureKind.Interface,
        name: fullName,
        isExported: true,
        properties,
    }],
  }, { overwrite: true });
};
