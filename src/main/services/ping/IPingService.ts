import { IService } from "../IService";
import { IpcMainInvokeEvent } from "electron";

export interface IPingService extends IService {
    sayHelloTo(event: IpcMainInvokeEvent, name: string): Promise<string>;
}
