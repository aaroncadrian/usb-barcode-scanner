# Type-Safe Library for USB Barcode Scanners
A type-safe library for using USB barcode scanners in Node.js with support for TypeScript.

<span style="color:red">On Linux and Mac, you have to run your application with root privileges.</span>

## Installation
You can install this package by running the following command:
``` bash
npm i usb-barcode-scanner --save
```
Or using yarn:
``` bash
yarn add usb-barcode-scanner
```

## TypeScript Usage

### Instantiating a Scanner

#### By Vendor ID and Product ID
You can instantiate a scanner by passing an object containing the vendorId and productId of the device:

``` typescript
import { UsbScanner } from 'usb-barcode-scanner';

const scanner = new UsbScanner({
    vendorId: 1155,
    productId: 22352
});

scanner.on('data', (data) => {
    console.log(data);
});

scanner.startScanning();
```

#### By Path

``` typescript
import { UsbScanner } from 'usb-barcode-scanner';

const scanner = new UsbScanner({
    path: 'IOService:/AppleACPI etc...'
});

scanner.on('data', (data) => {
    console.log(data);
});

scanner.startScanning();
```

### Stop Scanning

To stop scanning, you can use:
``` typescript
scanner.stopScanning();
```

Currently, when you call the ```stopScanning()``` method, 
you cannot resume scanning on the same object by calling ```startScanning()``` again.

### List all HID devices
You can list all HID devices using the following code:
``` typescript
import { DeviceManager } from 'usb-barcode-scanner';

console.log(DeviceManager.devices);
```

or the following way:

``` typescript
import { getDevices } from 'usb-barcode-scanner';

console.log(getDevices());
```

## Vanilla JavaScript Usage
You can list all devices using the following code:
``` javascript
let getDevices = require('usb-barcode-scanner').getDevices;

console.log(getDevices());
```

``` javascript
let UsbScanner = require('usb-barcode-scanner').UsbScanner;

let scanner = new UsbScanner({
    vendorId: 1155,
    productId: 22352
});

scanner.on('data', (data) => {
    console.log(data);
});

scanner.startScanning();
```

To stop scanning, you can use:
``` typescript
scanner.stopScanning();
```