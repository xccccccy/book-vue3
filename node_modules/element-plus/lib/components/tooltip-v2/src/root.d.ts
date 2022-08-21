import type { ExtractPropTypes } from 'vue';
declare type StateUpdater = (state: boolean) => void;
export declare const tooltipV2RootProps: {
    readonly delayDuration: import("element-plus/es/utils").BuildPropReturn<NumberConstructor, 300, unknown, unknown, unknown>;
    readonly defaultOpen: BooleanConstructor;
    readonly open: import("element-plus/es/utils").BuildPropReturn<BooleanConstructor, undefined, unknown, unknown, unknown>;
    readonly onOpenChange: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<StateUpdater>, unknown, unknown, unknown, unknown>;
    readonly 'onUpdate:open': import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<StateUpdater>, unknown, unknown, unknown, unknown>;
};
export declare type TooltipV2RootProps = ExtractPropTypes<typeof tooltipV2RootProps>;
export {};
