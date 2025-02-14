import { ipcRenderer } from "electron";

export const ping = async (message: string): Promise<string> => {
    return ipcRenderer.invoke("ping:sayHelloTo", message);
}