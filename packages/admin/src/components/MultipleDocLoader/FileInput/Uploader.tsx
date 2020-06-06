import { Icon, Text } from '@we-ui-components/base';
import * as React from 'react';
import styled from 'styled-components';

interface IFileUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  amount: number;
  description?: string;
  onClearClick(): void;
}

export const FileUploader = ({
  amount,
  onClearClick,
  description,
  ...rest
}: IFileUploaderProps) => (
  <FileWrap>
    {amount === 0 && (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon
          glyph="Document"
          size="26px"
          color="#4740A1"
          margin={{ right: 'medium' }}
        />
        <Text size="small" color="Basic800">
          {description ? (
            description
          ) : (
            <div style={{ maxWidth: '300px' }}>
              Для добавления документа перетащите его или{' '}
              <span style={{ color: '#4740A1' }}>нажмите здесь</span>
            </div>
          )}
        </Text>
      </div>
    )}
    {amount > 0 && (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="small">Выбрано файлов: {amount}</Text>
        <div
          style={{
            cursor: 'pointer',
            marginLeft: '12px',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            glyph="Close"
            color="Basic500"
            size="16px"
            onClick={onClearClick}
          />
        </div>
      </div>
    )}
    <InputContainer>
      <input type="file" {...rest} />
    </InputContainer>
  </FileWrap>
);

export const FileWrap = styled.div`
  position: relative;
  border: ${(props: any) => `1px dashed ${props.theme.palette.Purple500}`};
  border-radius: 4px;
  cursor: pointer;
  padding: 24px;
  height: 40px;
  
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s all;

  &:hover {
    opacity: 0.85;
  }

  span {
    color: ${(props: any) => props.theme.palette.Purple600};
  }
`;

export const InputContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;

  input {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
  }
`;
