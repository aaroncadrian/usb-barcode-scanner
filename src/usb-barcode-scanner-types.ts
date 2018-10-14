export interface UsbScannerOptions {
    vendorId?: number,
    productId?: number,
    path?: string
}

export interface VendorProductOption {
    vendorId: number;
    productId: number;
}

export interface PathOption {
    path: string;
}

export interface OnDataScanned {
    on(event: string, listener: Function): this;
}

export interface HidMap {
    [code: number]: string
}
