import type { ExtractPropTypes } from 'vue';
declare const effects: readonly ["light", "dark"];
declare const triggers: readonly ["click", "contextmenu", "hover", "focus"];
export declare const Effect: {
    LIGHT: string;
    DARK: string;
};
export declare type PopperEffect = typeof effects[number];
export declare type PopperTrigger = typeof triggers[number];
export declare const usePopperProps: {
    readonly autoClose: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 0, unknown, unknown, unknown>;
    readonly cutoff: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
    readonly disabled: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, false, unknown, unknown, unknown>;
};
export declare type UsePopperProps = ExtractPropTypes<typeof usePopperProps>;
export {};
