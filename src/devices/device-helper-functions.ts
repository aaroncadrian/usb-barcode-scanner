import { Device } from "node-hid";
import { DeviceManager } from "./device-manager";

export function getDevices(): Device[] {
    return DeviceManager.devices;
}

export function getDevice(vendorId: number, productId: number): Device|undefined {
    return DeviceManager.getDevice({vendorId, productId});
}

export function getDeviceByPath(path: string): Device|undefined {
    return DeviceManager.getDevice({path});
}