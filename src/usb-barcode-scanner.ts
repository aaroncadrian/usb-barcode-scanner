import { HID } from 'node-hid';
import { EventEmitter } from 'events';

import { HidMap, OnDataScanned, UsbScannerOptions } from './usb-barcode-scanner-types';
import { defaultHidMap } from './usb-barcode-scanner-utils';
import { DeviceManager } from "./device-manager";


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
        let bcodeBuffer: string[] = [];
        let barcode: string = '';

        if (this.hid) {
            this.hid.on('data', (chunk) => {
                if (this.hidMap[chunk[2]]) {
                    if (chunk[2] !== 40) {
                        bcodeBuffer.push(this.hidMap[chunk[2]]);
                    } else {
                        barcode = bcodeBuffer.join("");
                        bcodeBuffer = [];

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
        this.emit('data', data)
    }
}