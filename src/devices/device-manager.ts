import { Device, devices } from "node-hid";
import _ from "lodash";
import { UsbScannerOptions } from "../scanner/options.interface";
import { isPathOption } from "../scanner/options.interface";

export class DeviceManager {
    private readonly devices: Device[];

    constructor() {
        this.devices = devices();
    }

    getDevices(): Device[] {
        return this.devices;
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