declare const _default: import("vue").DefineComponent<{
    readonly virtualRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("element-plus/es/tokens").Measurable>, unknown, unknown, unknown, unknown>;
    readonly virtualTriggering: BooleanConstructor;
    readonly onMouseenter: FunctionConstructor;
    readonly onMouseleave: FunctionConstructor;
    readonly onClick: FunctionConstructor;
    readonly onKeydown: FunctionConstructor;
    readonly onFocus: FunctionConstructor;
    readonly onBlur: FunctionConstructor;
    readonly onContextmenu: FunctionConstructor;
    readonly id: StringConstructor;
    readonly open: BooleanConstructor;
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        readonly virtualRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("element-plus/es/tokens").Measurable>, unknown, unknown, unknown, unknown>;
        readonly virtualTriggering: BooleanConstructor;
        readonly onMouseenter: FunctionConstructor;
        readonly onMouseleave: FunctionConstructor;
        readonly onClick: FunctionConstructor;
        readonly onKeydown: FunctionConstructor;
        readonly onFocus: FunctionConstructor;
        readonly onBlur: FunctionConstructor;
        readonly onContextmenu: FunctionConstructor;
        readonly id: StringConstructor;
        readonly open: BooleanConstructor;
    }>> & {
        [x: string & `on${string}`]: ((...args: any[]) => any) | ((...args: unknown[]) => any) | undefined;
    }>>;
    triggerRef: import("vue").Ref<import("element-plus/es/tokens").Measurable | undefined>;
    ElOnlyChild: import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    readonly virtualRef: import("element-plus/es/utils").BuildPropReturn<import("element-plus/es/utils").PropWrapper<import("element-plus/es/tokens").Measurable>, unknown, unknown, unknown, unknown>;
    readonly virtualTriggering: BooleanConstructor;
    readonly onMouseenter: FunctionConstructor;
    readonly onMouseleave: FunctionConstructor;
    readonly onClick: FunctionConstructor;
    readonly onKeydown: FunctionConstructor;
    readonly onFocus: FunctionConstructor;
    readonly onBlur: FunctionConstructor;
    readonly onContextmenu: FunctionConstructor;
    readonly id: StringConstructor;
    readonly open: BooleanConstructor;
}>>, {
    open: boolean;
    virtualRef: import("element-plus/es/tokens").Measurable;
    virtualTriggering: boolean;
}>;
export default _default;
