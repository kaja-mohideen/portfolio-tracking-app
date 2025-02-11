import { ipcRenderer } from "electron";

export const send = async (channel: string, data: any): Promise<void> => {
    ipcRenderer.send(channel, data)
}

export const on = async (channel: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void): Promise<void> => {
    ipcRenderer.on(channel, callback)
}