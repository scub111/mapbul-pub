import * as React from 'react';
import { useCallback, useState } from 'react';
import styled from "styled-components";
import { IStyledProps } from 'themes';
import { DictionaryIcon } from '..';

export const DictionaryCreateButton: React.FC<{
  glyph: string
  onClick?: () => void;
}> = ({ glyph, onClick }) => {

  const onClickHandler = useCallback(
    () => {
      onClick && onClick();
    },
    [],
  );

  const [hover, setHover] = useState<boolean>(false);
  const onMouseEnterHandler = useCallback(
    () => {
      setHover(true);
    },
    [hover],
  );
  const onMouseLeaveHandler = useCallback(
    () => {
      setHover(false)
    },
    [hover],
  );

  return <Container
    onClick={onClickHandler}
    onMouseEnter={onMouseEnterHandler}
    onMouseLeave={onMouseLeaveHandler}
  >
    <DictionaryIcon
      glyph={glyph}
      forceHover={hover}
    />
  </Container>
}

const Container = styled.div<IStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px ${(props: IStyledProps) => props.theme.palette.Basic200};
  background-color: ${(props: IStyledProps) => props.theme.palette.StandardWhite};
`;