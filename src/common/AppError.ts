interface AppErrorArgs {
    message: string;
    details?: string;
}

class AppError extends Error {
    public details: string | null;

    constructor({ message, details = null }: AppErrorArgs) {
        super(message);
        this.details = details;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export default AppError;