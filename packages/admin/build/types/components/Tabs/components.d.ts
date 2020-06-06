import { ITabProps } from '.';
import { IStyledProps } from 'themes';
interface ITabContainerProps {
    active: boolean;
}
export declare const TabContainer: import("styled-components").StyledComponent<"div", any, ITabContainerProps & ITabProps & IStyledProps, never>;
export declare const TabItem: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const SubTabContainer: import("styled-components").StyledComponent<"div", any, IStyledProps, never>;
export declare const SubTabItem: import("styled-components").StyledComponent<"div", any, ITabContainerProps, never>;
export {};
