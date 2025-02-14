export interface IService {
    getServiceName(): string;

    /**
     * All other methods defined by Sub-classes must have the IPCMainInvokeEvent as first argument.
     */
}
