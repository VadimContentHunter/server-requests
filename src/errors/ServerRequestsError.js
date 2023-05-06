export class ServerRequestsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerRequestsError';
    }
}
