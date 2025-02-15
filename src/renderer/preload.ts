// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { IPingService } from '../common/services/IPingService';

const electronMain: {
    ping: IPingService
} = {
    ping: {
        sayHelloTo(name) {
            return ipcRenderer.invoke("ping:sayHelloTo", name);
        },
    }
}

contextBridge.exposeInMainWorld('ElectronMain', electronMain);
