declare interface Window {
    __APP_VERSION__: string;
}

type Nullable<T> = T | null;
type Recordable<T = any> = Record<string, T>;