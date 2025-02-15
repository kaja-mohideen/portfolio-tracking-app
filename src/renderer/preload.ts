// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// preload.ts
import { contextBridge, ipcRenderer } from 'electron';

// Expose services to renderer with type safety
contextBridge.exposeInMainWorld('ElectronMain', {
    ping: {
        sayHelloTo: async function (msg: string) {
            return ipcRenderer.invoke("ping:sayHelloTo", msg);
        }
    }
});
