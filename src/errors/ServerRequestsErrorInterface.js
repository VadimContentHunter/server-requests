import { ServerRequestsError } from './ServerRequestsError.js';

export class ServerRequestsErrorInterface extends ServerRequestsError {
    constructor(message) {
        super(message);
        this.name = 'ServerRequestsErrorInterface';
    }
}
