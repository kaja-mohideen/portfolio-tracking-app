import { IPingService } from './IPingService';
import { handleIPC } from '../../infra/ipc/ipcDecorator';
import { IpcMainInvokeEvent } from 'electron';

export class PingService implements IPingService {
    
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
