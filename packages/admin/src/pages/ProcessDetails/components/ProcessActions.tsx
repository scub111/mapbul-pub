import { Button } from '@we-ui-components/base';
import * as React from 'react';
import { Box } from 'grommet';

export const enum MODAL_MODE {
  INFO = 'INFO',
  ACCEPT = 'accept',
  REJECT = 'reject',
  PROCESS = 'process',
  DEFAULT = 'DEFAULT',
  REVERT = 'REVERT',
  CHANGE_AMOUNTS = 'CHANGE_AMOUNTS',
}

interface IProposalActionsProps {
  isActionEnabled: boolean;
  setMode: (mode: MODAL_MODE) => void;
  mode: MODAL_MODE;
  onClose: () => void;
  onReject: () => void;
  onAccept: () => void;
  rejectText: string;
  acceptText: string;
  isDisabled?: boolean;
}

export const ProcessActions = ({
  isActionEnabled,
  mode,
  setMode,
  onClose,
  onAccept,
  onReject,
  rejectText,
  acceptText,
  isDisabled = false,
}: IProposalActionsProps) => {
  const closeButton = () => (
    <Button size="auto" onClick={onClose}>
      Закрыть
    </Button>
  );
  const cancelButton = () => (
    <Button
      size="auto"
      transparent
      margin="0 24px 0 0"
      onClick={() => setMode(MODAL_MODE.INFO)}
      color="Basic700"
    >
      Отмена
    </Button>
  );
  const acceptButton = (props?: any) => (
    <Button
      size="auto"
      {...props}
      margin={{ left: '24px' }}
      disabled={isDisabled}
    >
      {acceptText}
    </Button>
  );
  const rejectButton = (props?: any) => (
    <Button {...props} size="auto" disabled={isDisabled}>
      {rejectText}
    </Button>
  );

  if (!isActionEnabled) {
    return closeButton();
  }

  switch (mode) {
    case MODAL_MODE.REJECT:
      return (
        <Box direction="row">
          {cancelButton()}
          {rejectButton({ onClick: onReject })}
        </Box>
      );
    case MODAL_MODE.ACCEPT:
      return (
        <Box direction="row">
          {cancelButton()}
          {acceptButton({ onClick: onAccept })}
        </Box>
      );
    default:
      return (
        <Box direction="row">
          {rejectButton({
            transparent: true,
            margin: '0 24px 0 0',
            onClick: () => onReject(),
          })}
          {acceptButton({ onClick: onAccept })}
        </Box>
      );
  }
};
