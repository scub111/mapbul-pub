import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from 'grommet';
import { Title, Text, FieldWrapper } from '@we-ui-components/base';
import { FileInput } from './FileInput';
import { createField } from '@we-ui-components/form';
import { nonEmptyFilesRule } from 'utils/validators';

export const PrettifyFileInput = createField<any>({
  wrapper: FieldWrapper,
  wrapperParams: { hasFeedback: true },
  component: props => <FileInput size="full" {...props} />,
});

export interface IMultipleDocLoaderProps {
  name: string;
  title?: string;
  documents: string[];
  data: any;
}

export const MultipleDocLoader: React.FC<IMultipleDocLoaderProps> = observer<
  IMultipleDocLoaderProps
>(props => {
  return (
    <Box>
      <Title size="xsmall">{props.title}</Title>
      {props.documents.map(docType => {
        const isActive =
          props.data[props.name] &&
          props.data[props.name][docType] &&
          !!props.data[props.name][docType].length;

        return (
          <Box key={docType} margin={{ top: 'large' }}>
            <Text size="small" color="Basic800" margin={{ bottom: 'small' }}>
              {docType}
            </Text>
            <Box
              style={{
                border: isActive ? '1px solid #E7ECF7' : 'none',
                borderRadius: '4px',
                padding: isActive ? '16px 16px 0 16px' : 0,
              }}
            >
              <PrettifyFileInput
                multiple
                name={`${props.name}.${docType}`}
                rules={[nonEmptyFilesRule]}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
});
