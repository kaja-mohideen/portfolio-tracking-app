import 'reflect-metadata';
import { ipcMain } from 'electron';
import { IService } from '../../services/IService';

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

export function registerService(instance: IService) {
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
