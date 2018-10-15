export interface VendorProductOption {
    vendorId: number;
    productId: number;
}

export interface PathOption {
    path: string;
}

export type UsbScannerOptions = VendorProductOption|PathOption;

export function isPathOption(option: UsbScannerOptions): option is PathOption {
    return (<PathOption>option).path !== undefined;
}

export interface OnDataScanned {
    on(event: string, listener: Function): this;
}

export interface HidMap {
    [code: number]: string
}
