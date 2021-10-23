import React, { FunctionComponent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

interface IModalHandlers {
  onSubmit: (value: boolean) => void;
  onDismiss: () => void;
}

export default function promiseModal(
  RenderModal: FunctionComponent<any>,
  props?: React.ComponentProps<any>
) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  function displayModal({ onSubmit, onDismiss }: IModalHandlers) {
    render(
      <RenderModal
        handleClose={onDismiss}
        handleSubmit={onSubmit}
        open
        {...props}
      />,
      container
    );
  }

  function hideModal({ onSubmit, onDismiss }: IModalHandlers) {
    render(
      <RenderModal
        handleClose={onDismiss}
        handleSubmit={onSubmit}
        open={false}
        {...props}
      />,
      container
    );
  }

  function destroyModal() {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
  }

  const confirmation = new Promise((resolve) => {
    const onSubmit = (value = true) => {
      resolve(value);
    };

    const onDismiss = () => {
      hideModal({ onSubmit, onDismiss });
      resolve(undefined);
    };

    displayModal({ onSubmit, onDismiss });
  });

  return confirmation.finally(() => destroyModal());
}
