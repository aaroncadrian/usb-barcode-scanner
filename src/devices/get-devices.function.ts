import { Device } from "node-hid";
import { DeviceManager } from "./device-manager";

export function getDevices(): Device[] {
    return DeviceManager.devices;
}