import { Project } from 'ts-morph';
import { createDTO } from './dto';
import { IField } from './IField';
import appRootPath from 'app-root-path';

const project = new Project({
  tsConfigFilePath: `${appRootPath.path}/tsconfig.json`,
});

project.addExistingSourceFiles('src/**/*.ts');

const fields: IField[] = [
  { name: 'id', type: 'string'},
  { name: 'temp', type: 'string'},
];

createDTO(project, 'articles2', 'Article', fields);

project.save();
