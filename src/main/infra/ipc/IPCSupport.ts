import 'reflect-metadata';
import { ipcMain, IpcMainInvokeEvent } from 'electron';

type AddExtraArgumentToEachFunction<T, ExtraArgument> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (ipcMainEvent: ExtraArgument, ...args: A) => R : T[K];
};

export type AddIPCSupport<T> = AddExtraArgumentToEachFunction<T, IpcMainInvokeEvent> & IPCService;

interface IpcMethod {
    methodName: string;
    method: Function;
}

export function handleIPC() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!Reflect.hasMetadata('ipcMethods', target)) {
            Reflect.defineMetadata('ipcMethods', [], target);
        }

        const methods: IpcMethod[] = Reflect.getMetadata('ipcMethods', target);
        methods.push({
            methodName: propertyKey,
            method: descriptor.value
        });
        Reflect.defineMetadata('ipcMethods', methods, target);
    };
}

interface IPCService {
    getServiceName(): string;
}

export function registerService(instance: IPCService) {
    const serviceName = instance.getServiceName();
    const methods: IpcMethod[] = Reflect.getMetadata('ipcMethods', instance) || [];

    methods.forEach(({ methodName, method }) => {
        const eventName = `${serviceName}:${methodName}`;

        ipcMain.handle(eventName, async (event, ...args) => {
            try {
                return await method.apply(instance, [event, ...args]);
            } catch (error) {
                console.error(`Error in IPC handler ${eventName}:`, error);
                return { error: error.message };
            }
        });
    });
}
