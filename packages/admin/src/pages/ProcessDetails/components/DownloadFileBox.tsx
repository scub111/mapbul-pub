import * as React from 'react';
import {Icon, Text} from "@we-ui-components/base";
import {Box} from "grommet";
import { api } from 'services';
import styled from "styled-components";
import {downloadFile} from "../../../utils";

interface IProps {
  url: string,
  title: string,
  fileName?: string;
  actions?: IAdditionalAction[];
}

interface IAdditionalAction {
  name: string;
  action: () => void;
}

const DocumentBox = styled.div`
  display: flex;
  position: relative;
  padding: 20px 24px;
  border: 1px solid ${props => props.theme.palette.Basic200};
  border-radius: 4px;
`;

const DownloadButton = styled.div`
  cursor: pointer;
  color: ${props => props.theme.palette.Basic500};
  font-size: 13px;
  font-weight: 400;
  
  &:hover {
    text-decoration: underline;
  }
`;

export function DownloadFileBox(props: IProps) {
  const { title, url, fileName, actions = [] } = props;

  const onDownloadClick = () => {
    const ahref = document.createElement('a');
    document.body.appendChild(ahref);
    downloadFile(ahref, `${url}&access_token=${api.getToken()}`, fileName);
    document.body.removeChild(ahref);
  };

  return (
    <DocumentBox>
      <Box direction="row" align="center">
        <Icon glyph="Document2" size="32px" color="Basic700" />
        <Box margin={{ left: 'xsmall' }}>
          <Text size="small">{title}</Text>
          <Box direction="row" gap="xsmall">
            <DownloadButton onClick={onDownloadClick}>
              {'Скачать'}
            </DownloadButton>
            {actions.map(({ name, action }) => (
              <DownloadButton onClick={action}>{name}</DownloadButton>
            ))}
          </Box>
        </Box>
      </Box>
    </DocumentBox>
  )
}