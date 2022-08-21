import type { configProviderProps } from 'element-plus/es/components/config-provider';
import type { ExtractPropTypes, InjectionKey, Ref } from 'vue';
export declare type ConfigProviderContext = Partial<ExtractPropTypes<typeof configProviderProps>>;
export declare const configProviderContextKey: InjectionKey<Ref<ConfigProviderContext>>;
