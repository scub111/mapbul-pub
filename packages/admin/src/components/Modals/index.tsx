import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { ModalView } from '@we-ui-components/base';

export const Modals: React.FC = observer(() => {
  const { modals, actionModals } = useStores();
  const { render, options = {} } = modals;

  if (!render) {
    return null;
  }

  const {
    width = '700px',
    position = 'center',
    isOverlayClose = false,
  } = options;

  let isHidden = false;

  if (actionModals.pool.length) {
    isHidden = !actionModals.pool[actionModals.pool.length - 1].options
      .showOther;
  }

  return (
    <ModalView
      width={width}
      position={position}
      isOverlayClose={isOverlayClose}
      onClose={() => modals.closeModal()}
      style={{ visibility: isHidden ? 'hidden' : 'visible' }}
      config={modals}
    >
      {render()}
    </ModalView>
  );
});
