import styled from "styled-components";
import { ITabProps } from '.';
import { IStyledProps } from 'themes';

interface ITabContainerProps {
  active: boolean;
}

export const TabContainer = styled.div<ITabContainerProps & ITabProps & IStyledProps>`
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  font-family: PF Din Text Cond Pro;
  cursor: pointer;

  &:hover { 
    background-color: ${(props: IStyledProps) => props.theme.palette.Basic100};
  }

  &:first-child {
    border-radius: 2px 0 0 2px
  }

  &:last-child {
    border-radius: 0 2px 2px 0
  }

  ${(props: ITabContainerProps & IStyledProps) => props.active && `
    border-bottom: 3px solid ${props.theme.palette.Purple500};
  `}

  ${(props) => props.small && `
    height: auto;
    padding: 10px 8px 10px 8px; 
    font-size: 14px; 
    letter-spacing: 3px;
  `}
`;

export const TabItem = styled.div`
  padding: 21px 15px;
`;

export const SubTabContainer = styled.div`
  position: absolute;
  margin-top: 3px;
  width: 280px;
  border-radius: 4px;
  box-shadow: 8px 8px 8px 0 ${(props: IStyledProps) => props.theme.palette.Shadow};
  border: solid 1px ${(props: IStyledProps) => props.theme.palette.Basic200};
  background-color: ${(props: IStyledProps) => props.theme.palette.StandardWhite};
  z-index: 999;
`;

export const SubTabItem = styled.div<ITabContainerProps>`
  display: flex;
  display-direction: column;
  height: 38px;
  padding: 0px 31px;
  align-items: center;
  
  &:hover {
    background-color: ${(props: IStyledProps) => props.theme.palette.Basic100};
  }
  
  ${(props: ITabContainerProps & IStyledProps) => props.active && `
    padding: 0px 28px;
    border-left: 3px solid ${props.theme.palette.Purple500};
  `}
`;