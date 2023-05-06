import { ServerRequestsError } from './errors/ServerRequestsError.js';

export class ServerRequests {
    constructor() {
        console.log('ServerRequests connected!');
        this.eventRegister();
    }

    handleEvent(event) {
        this[event.type](event);
    }

    eventRegister() {
        Object.getOwnPropertyNames(this.constructor.prototype).filter((methodName) => {
            if (
                methodName !== 'constructor' &&
                methodName !== 'handleEvent' &&
                methodName !== 'eventRegister' &&
                methodName !== 'request'
            ) {
                document.addEventListener(methodName, this);
                console.log('ServerRequests: событие[' + methodName + '] зарегистрировано!');
                return true;
            }
            return false;
        });
    }

    request(requestType, requestParameters = {}) {
        if (typeof requestType !== 'string') {
            throw new ServerRequestsError('Параметр requestType не является строкой.');
        }

        document.dispatchEvent(
            new CustomEvent(requestType, {
                detail: requestParameters,
            }),
        );
        return this;
    }

    async fetchRequestForm(event) {
        event.preventDefault();
        console.log('Событие: fetchRequestForm');
        console.log(event.detail);

        // Проверки для event.detail.url
        if (!Object.prototype.hasOwnProperty.call(event.detail, 'url')) {
            throw new ServerRequestsError('Поле url ненайдено.');
        }

        if (typeof event.detail.url !== 'string') {
            throw new ServerRequestsError('Поле url в объекте "requestParameters" не является строкой.');
        }

        // Проверки для event.detail.method
        if (!Object.prototype.hasOwnProperty.call(event.detail, 'method')) {
            throw new ServerRequestsError('Поле method ненайдено.');
        }

        if (typeof event.detail.method !== 'string') {
            throw new ServerRequestsError('Поле method в объекте "requestParameters" не является строкой.');
        }

        // const response = await fetch('/article/formdata/post/user-avatar', {
        //     method: 'POST',
        //     body: new FormData(),
        // });

        return this;
    }

    async fetchRequestTest2(event) {
        event.preventDefault();
        console.log('Событие: fetchRequestTest2');
        console.log(event.detail);

        return this;
    }
}
