import type { ExtractPropTypes } from 'vue';
export declare type RefSetter = (el: HTMLElement | null) => void;
export declare const forwardRefProps: {
    readonly setRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<RefSetter>, unknown, true, unknown, unknown>;
    readonly onlyChild: BooleanConstructor;
};
export declare type ForwardRefProps = ExtractPropTypes<typeof forwardRefProps>;
declare const _default: import("vue").DefineComponent<{
    readonly setRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<RefSetter>, unknown, true, unknown, unknown>;
    readonly onlyChild: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly setRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<RefSetter>, unknown, true, unknown, unknown>;
    readonly onlyChild: BooleanConstructor;
}>>, {
    onlyChild: boolean;
}>;
export default _default;
