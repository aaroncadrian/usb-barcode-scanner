import { DEFAULT_HID_MAP } from "./default-hid-map";
import { IHidMap } from "./hid-map.interface";

export class HidMap {
    private static _defaultHidMap: IHidMap = DEFAULT_HID_MAP;
    
    public static get defaultHidMap(): IHidMap {
        return HidMap._defaultHidMap;
    }

    public static setDefault(hidMap: IHidMap): void {
        HidMap._defaultHidMap = hidMap;
    }
}