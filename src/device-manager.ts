import { Device, devices } from "node-hid";
import _ from "lodash";
import { isPathOption, UsbScannerOptions } from "./usb-barcode-scanner-types";

export class DeviceManager {
    private readonly devices: Device[];

    constructor() {
        this.devices = devices();
    }

    getDevice(options: UsbScannerOptions): Device|undefined {
        let predicate: object;
        
        if (isPathOption(options)) {
            predicate = {path: options.path};
        } else {
            predicate = {vendorId: options.vendorId, productId: options.productId};
        }

        return _.find(this.devices, predicate);
    }
}