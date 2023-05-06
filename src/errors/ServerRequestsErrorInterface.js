import { ServerRequestsError } from './ServerRequestsError';

export class ServerRequestsErrorInterface extends ServerRequestsError {
    constructor(message) {
        super(message);
        this.name = 'ServerRequestsErrorInterface';
    }
}
