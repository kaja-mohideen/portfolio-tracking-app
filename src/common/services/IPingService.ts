export interface IPingService {
    sayHelloTo(name: string): Promise<string>;
}