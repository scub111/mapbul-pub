import * as React from 'react';
import styled from 'styled-components';

export interface IIConProps {
  hover?: boolean;
  component: React.ElementType;
  [name: string]: any;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props: IIConProps) =>
    props.hover &&
    `
    &:hover {
      opacity: 0.7;
    }
  `}
`;

class Icon extends React.Component<IIConProps> {
  private ref: any;

  public componentDidMount() {
    if (this.props.onClick) {
      this.ref.addEventListener('click', this.onClick);
    }
  }

  public componentWillUnmount() {
    if (this.props.onClick) {
      this.ref.removeEventListener('click', this.onClick);
    }
  }

  public render() {
    const { hover, onClick, component: Component, ...params } = this.props;

    return (
      <Container ref={(ref: any) => (this.ref = ref)} hover={hover}>
        <Component {...params} />
      </Container>
    );
  }

  private onClick = (evt: Event) => {
    evt.stopPropagation();
    evt.preventDefault();

    this.props.onClick();
  };
}

function convertToSVGProps(props: Partial<IIConProps>) {
  const { size, width, height, ...restProps } = props;
  return {
    ...restProps,
    width: getSVGSize(size, width),
    height: getSVGSize(size, height),
  };
}

function getSVGSize(size: string, value: string) {
  switch (size) {
    case 'small':
      return '12px';
    case 'medium':
      return '16px';
    case 'large':
      return '20px';
    case 'xlarge':
      return '24px';

    default:
      return size || value ? value : '20px';
  }
}

export const customizeHOC = (Component: React.ElementType) => {
  return (props: Partial<IIConProps>) => (
    <Icon {...convertToSVGProps(props)} component={Component} />
  );
};
