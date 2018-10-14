import { Device, HID } from 'node-hid';
import { EventEmitter } from 'events';

import { HidMap, OnDataScanned, PathOption, VendorProductOption } from './usb-barcode-scanner-types';
import { defaultHidMap, getDevice, getDeviceByPath } from './usb-barcode-scanner-utils';

function isPathOption(option: VendorProductOption|PathOption): option is PathOption {
    return (<PathOption>option).path !== undefined;
}

export class UsbScanner extends EventEmitter implements OnDataScanned {
    hid?: HID;
    hidMap: HidMap;

    constructor(options: VendorProductOption|PathOption, hidMap?: HidMap) {
        super();

        let device: Device|undefined;

        if (isPathOption(options)) {
            device = this.retrieveDeviceByPath(options.path);
        } else {
            device = getDevice(options.vendorId, options.productId);
        }

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

    private retrieveDevice(vendorId: number, productId: number): Device|undefined {
        return getDevice(vendorId, productId);
    }

    private retrieveDeviceByPath(path: string): Device|undefined {
        return getDeviceByPath(path);
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