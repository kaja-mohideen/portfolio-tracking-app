import { IPingService } from "../common/services/IPingService"

declare global {
    interface Window {
        ElectronMain: {
            ping: IPingService
        }
    }
}