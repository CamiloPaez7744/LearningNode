interface CheckServiceUseCase {
    checkStatus(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    public async checkStatus(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);

            if (!req.ok) {
                throw new Error(`Error checking service: ${url}`);
            }

            this.successCallback();
            console.log(`Service is up: ${url}`);

            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            console.error(error);
            return false;
        }
    }
}