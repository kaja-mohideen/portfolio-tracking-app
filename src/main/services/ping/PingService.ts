import { AddIPCSupport, handleIPC } from '../../infra/ipc/IPCSupport';
import { IPingService } from '../../../common/services/IPingService';
import { IpcMainInvokeEvent } from 'electron';

type IPCPingService = AddIPCSupport<IPingService>
export class PingService implements IPCPingService {
    
    getServiceName(): string {
        return 'ping';
    }

    @handleIPC()
    sayHelloTo(event: IpcMainInvokeEvent, name: string): Promise<string> {
        console.log (`sayHello Called with ${name}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`Hello ${name}`);
                console.log ("sayHello Responded");
            }, 5000);
        });
    }
}
