import { DeviceManager } from "./device-manager";

export function getDevices() {
    const deviceManager = new DeviceManager();
    return deviceManager.getDevices();
}