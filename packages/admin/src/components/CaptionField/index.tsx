import * as React from 'react';
import { Col } from '@we-ui-components/base';
import { Heading } from 'grommet';
import { ReactRenderFn } from 'interfaces';

interface IProps {
  caption: string;
  render: ReactRenderFn;
}

export const CaptionField: React.FC<IProps> = ({ caption, render }) => {
  return (
    <Col ai="flex-start">
      <Heading
        size="13px"
        // style={{ color: 'Grey500' }}
        style={{ color: '#9698a7' }}
      >
        {caption}
      </Heading>
      {render()}
    </Col>
  );
};
