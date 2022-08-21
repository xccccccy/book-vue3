import type { ComponentPublicInstance } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import type { Measurable } from 'element-plus/es/tokens';
import type { UsePopperCoreConfigProps } from './content';
declare type ArrowProps = {
    arrowEl: HTMLElement | undefined;
    arrowOffset: number | undefined;
};
export declare const buildPopperOptions: (props: UsePopperCoreConfigProps, arrowProps: ArrowProps) => {
    modifiers: ({
        name: string;
        options: {
            offset: number[];
            padding?: undefined;
            fallbackPlacements?: undefined;
            gpuAcceleration?: undefined;
            adaptive?: undefined;
        };
    } | {
        name: string;
        options: {
            padding: {
                top: number;
                bottom: number;
                left: number;
                right: number;
            };
            offset?: undefined;
            fallbackPlacements?: undefined;
            gpuAcceleration?: undefined;
            adaptive?: undefined;
        };
    } | {
        name: string;
        options: {
            padding: number;
            fallbackPlacements: import("@popperjs/core").Placement[];
            offset?: undefined;
            gpuAcceleration?: undefined;
            adaptive?: undefined;
        };
    } | {
        name: string;
        options: {
            gpuAcceleration: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
            adaptive: import("../../../utils").BuildPropType<BooleanConstructor, unknown, unknown>;
            offset?: undefined;
            padding?: undefined;
            fallbackPlacements?: undefined;
        };
    })[];
    placement: "top" | "right" | "bottom" | "left" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
    strategy: "fixed" | "absolute";
    onFirstUpdate?: ((arg0: Partial<import("@popperjs/core").State>) => void) | undefined;
};
export declare const unwrapMeasurableEl: ($el: MaybeRef<Measurable | undefined | ComponentPublicInstance>) => HTMLElement | undefined;
export {};
