import { HID } from 'node-hid';
import { EventEmitter } from 'events';

import { OnDataScanned } from './usb-barcode-scanner-types';
import { defaultHidMap } from '../hid-map/default-hid-map';
import { DeviceManager } from "../devices/device-manager";
import { UsbScannerOptions } from "./options.interface";
import { HidMap } from "../hid-map/hid-map.interface";


export class UsbScanner extends EventEmitter implements OnDataScanned {
    hid?: HID;
    hidMap: HidMap;

    constructor(options: UsbScannerOptions, hidMap?: HidMap) {
        super();

        const deviceManager = new DeviceManager();
        const device = deviceManager.getDevice(options);

        if (device === undefined) {
            console.warn(`Device not found, please provide a valid path or vendor/product combination.`);
        } else {
            this.hid = new HID(device.vendorId, device.productId);
        }

        if (hidMap) {
            this.hidMap = hidMap;
        } else {
            this.hidMap = defaultHidMap();
        }
    }

    startScanning(): void {
        if (this.hid) {
            let barcodeBuffer: string[] = [];
            let barcode: string = '';

            this.hid.on('data', (chunk) => {
                if (this.hidMap[chunk[2]]) {
                    if (chunk[2] !== 40) {
                        barcodeBuffer.push(this.hidMap[chunk[2]]);
                    } else {
                        barcode = barcodeBuffer.join("");
                        barcodeBuffer = [];

                        this.emitDataScanned(barcode);
                    }
                }
            });
        }
    }

    stopScanning(): void {
        if (this.hid) {
            this.hid.close();
        }
    }

    private emitDataScanned(data: string): void {
        this.emit('data', data);
    }
}