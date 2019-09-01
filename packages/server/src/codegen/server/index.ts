import { Project, StructureKind } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: 'path/to/tsconfig.json',
});

// add source files
project.addExistingSourceFiles('src/**/*.ts');
const myClassFile = project.createSourceFile('src/MyClass.ts', 'export class MyClass {}');
const myEnumFile = project.createSourceFile('src/MyEnum.ts', {
    statements: [{
        kind: StructureKind.Enum,
        name: 'MyEnum',
        isExported: true,
        members: [{ name: 'member' }],
    }],
});

// get information
const myClass = myClassFile.getClassOrThrow('MyClass');
myClass.getName();          // returns: "MyClass"
myClass.hasExportKeyword(); // returns: true
myClass.isDefaultExport();  // returns: false

// manipulate
const myInterface = myClassFile.addInterface({
    name: 'IMyInterface',
    isExported: true,
    properties: [{
        name: 'myProp',
        type: 'number',
    }],
});

myClass.rename('NewName');
myClass.addImplements(myInterface.getName());
myClass.addProperty({
    name: 'myProp',
    initializer: '5',
});

project.getSourceFileOrThrow('src/ExistingFile.ts').delete();

// asynchronously save all the changes above
project.save();
