import { Device, devices } from "node-hid";
import _ from "lodash";
import { isPathOption, UsbScannerOptions } from "../scanner/options.interface";

export class DeviceManager {
    private static readonly _devices: Device[] = devices();

    public static get devices(): Device[] {
        return DeviceManager._devices;
    }

    public static getDevice(options: UsbScannerOptions): Device|undefined {
        let predicate: object;

        if (isPathOption(options)) {
            predicate = {path: options.path};
        } else {
            predicate = {vendorId: options.vendorId, productId: options.productId};
        }

        return _.find(DeviceManager.devices, predicate);
    }
}