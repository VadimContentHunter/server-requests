import { ServerRequestsErrorInterface } from '../errors/ServerRequestsErrorInterface.js';

export class RequestEvent {
    #url;
    #method = 'POST';
    #params = {};
    #requestDataPacker;
    #responseHandler;

    constructor() {
        try {
            this.handleEvent({});
        } catch (error) {
            if (error instanceof ServerRequestsErrorInterface) {
                throw error;
            }
        }
    }

    // interface
    handleEvent(event) {
        throw new ServerRequestsErrorInterface('Метод handleEvent должен быть переопределен.');
    }

    set url(value) {
        if (typeof value !== 'string') {
            throw new ServerRequestsErrorInterface('Значение value для url не является строкой.');
        }
        this.#url = value;
    }

    get url() {
        if (typeof this.#url !== 'string') {
            throw new ServerRequestsErrorInterface('Поле url не является строкой.');
        }
        return this.#url;
    }

    set method(value) {
        if (typeof value !== 'string') {
            throw new ServerRequestsErrorInterface('Значение value для method не является строкой.');
        }
        this.#method = value;
    }

    get method() {
        if (typeof this.#method !== 'string') {
            throw new ServerRequestsErrorInterface('Поле method не является строкой.');
        }
        return this.#method;
    }

    set params(value) {
        if (typeof value !== 'object') {
            throw new ServerRequestsErrorInterface('Значение value для params не является объектом.');
        }
        this.#params = value;
    }

    get params() {
        if (typeof this.#params !== 'object') {
            throw new ServerRequestsErrorInterface('Поле params не является объектом.');
        }
        return this.#params;
    }

    set requestDataPacker(value) {
        if (typeof value !== 'function') {
            throw new ServerRequestsErrorInterface(
                'Значение value для requestDataPacker не является callback функцией.',
            );
        }

        this.#requestDataPacker = value;
    }

    get requestDataPacker() {
        if (typeof this.#requestDataPacker !== 'function') {
            throw new ServerRequestsErrorInterface('Поле requestDataPacker не является callback функцией.');
        }

        return this.#requestDataPacker;
    }

    set responseHandler(value) {
        if (typeof value !== 'function') {
            throw new ServerRequestsErrorInterface('Значение value для responseHandler не является callback функцией.');
        }

        this.#responseHandler = value;
    }

    get responseHandler() {
        if (typeof this.#responseHandler !== 'function') {
            throw new ServerRequestsErrorInterface('Поле responseHandler не является callback функцией.');
        }

        return this.#responseHandler;
    }
}