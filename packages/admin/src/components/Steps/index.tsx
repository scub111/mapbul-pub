import * as React from 'react';
import * as cn from 'classnames';
import * as styles from './Steps.styl';
import { Box, BoxProps } from 'grommet';
import { Finished } from '../../icons';

export const Steps: React.FC<IProps> = ({
  className,
  selected,
  onSelectStep,
  options,
  ...rest
}) => {
  const myClassName = cn(styles.steps, className);
  return (
    <Box className={myClassName} {...rest}>
      {options.map((props, index) => (
        <Step
          key={props.id}
          {...{
            ...props,
            selected,
            onSelectStep,
            index,
            stepsLength: options.length - 1,
          }}
        />
      ))}
    </Box>
  );
};

const Step: React.FC<IStepProps> = ({
  index,
  selected,
  id,
  text,
  disabled,
  className,
  textRender,
  stepsLength,
}) => {
  const isActive = String(selected) === String(id);
  const isLastActive = stepsLength === selected && isActive;
  const myClassName = cn(styles.step, className, {
    [styles.done]: selected > id,
    [styles.disabled]: disabled,
    [styles.selected]: isActive,
  });

  return (
    <Box className={myClassName} direction="row" align="center">
      <Box>
        {textRender && (
          <Box className={styles.stepText}>{textRender(isActive)}</Box>
        )}
        {text && <Box className={styles.stepText}>{text}</Box>}
      </Box>
      <Box className={styles.stepNumber}>{isLastActive && <Finished />}</Box>
    </Box>
  );
};

interface IStepProps extends IStepOption {
  index: number;
  stepsLength: number;
  selected: string | number;
  onSelectStep?: (id: string | number) => void;
  className?: string;
}

interface IProps extends BoxProps {
  options: Array<IStepOption>;
  selected: string | number;
  onSelectStep?: (id: string | number) => void;
  className?: string;
}

export interface IStepOption {
  id: string | number;
  text?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  textRender?: (isActive: boolean) => string | React.ReactNode;
}
