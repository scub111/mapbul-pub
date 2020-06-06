import * as React from 'react';

import { FileUploader } from './Uploader';

import { getFilesWithHashes, useDerivedState } from './utils';

import { Icon, Text } from '@we-ui-components/base';

interface IFileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value?: File[];
  description?: string;
  onChange?(files: File[]): void;
}

export const FileInput = (props: IFileInputProps) => {
  const { value: valueFromProps, onChange, description, ...inputProps } = props;

  const [value, setValue] = useDerivedState<File[]>([], {
    value: valueFromProps,
    setValue: onChange,
  });

  const addFiles = async (files: File[]) => {
    if (!props.multiple) {
      return setValue(files);
    }

    const currentValueHashes = getFilesWithHashes(value).map(it => it.hash);

    const newValue = [...value];
    getFilesWithHashes(files).forEach(({ file, hash }) => {
      if (!currentValueHashes.includes(hash)) {
        newValue.push(file);
      }
    });

    setValue(newValue);
  };

  const clearFiles = () => setValue([]);
  const removeFile = (index: number) =>
    setValue(value.filter((file, fileIndex) => fileIndex !== index));

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();

    const fromFileList = Array.from(e.currentTarget.files);
    addFiles(fromFileList);

    e.target.value = '';
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minWidth: '325px' }}
    >
      <FileUploader
        description={description}
        amount={value.length}
        onClearClick={clearFiles}
        onChange={onChangeHandler}
        style={{ flex: 1 }}
        {...inputProps}
      />
      {value.length ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            flexDirection: 'column',
            marginTop: '10px',
            padding: '0 30px',
          }}
        >
          {value.map((file, index) => (
            <div
              key={file.name + index}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                lineHeight: '2',
              }}
            >
              <Icon size="medium" glyph="Document" color="Basic500" />
              <Text size="small" style={{ flexGrow: 1, margin: '0 10px' }}>
                {file.name}
              </Text>
              <Icon
                size="16px"
                glyph="Close"
                color="Basic500"
                onClick={() => removeFile(index)}
              />
            </div>
          ))}
        </div>
      ): null}
    </div>
  );
};

export { getFileBase64, getFilesBase64, getFilesBase64Promise } from './utils';
