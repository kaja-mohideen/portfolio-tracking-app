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
                if (name === 'ansari') {
                    resolve(`1`);
                    console.log ("sayHello Responded");
                } else {
                    reject(new Error(`Unknown user ${name}`));
                }
            }, 5000);
        });
    }
}
