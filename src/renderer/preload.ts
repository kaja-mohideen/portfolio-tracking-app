// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import * as spi from "./api/IpcInterface";

contextBridge.exposeInMainWorld ('ElectronMain', {
    ping: spi.ping
})