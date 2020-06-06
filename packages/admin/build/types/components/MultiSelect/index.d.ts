declare type MultiSelectProps = {
    options: Array<string>;
    value: Array<string>;
    onSelect: (value: string) => void;
    onSelectAll: () => void;
    label?: string;
    style?: object;
    disabled?: boolean;
};
export declare const MultiSelect: ({ options, onSelect, value, onSelectAll, label, style, disabled, }: MultiSelectProps) => JSX.Element;
export {};
