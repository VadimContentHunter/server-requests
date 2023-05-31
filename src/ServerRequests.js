import { ServerRequestsError } from './errors/ServerRequestsError.js';
import { RequestEvent } from './interfaces/RequestEvent.js';

export class ServerRequests {
    #events = [];

    constructor() {
        // console.log('ServerRequests connected!');
    }

    get events() {
        if (!Array.isArray(this.#events)) {
            throw new ServerRequestsError('Полу #events не является массивом.');
        }
        return this.#events;
    }

    /**
     * @param {object} requestEvent Объект класса RequestEvent для обработки вызова событий.
     */
    eventRegistration(eventName, requestEvent) {
        if (!(requestEvent instanceof RequestEvent)) {
            throw new ServerRequestsError('Параметр requestEvent должен наследоваться от класса RequestEvent.');
        }

        if (!this.hasEvent(eventName)) {
            document.addEventListener(eventName, requestEvent);
            this.#events.push(eventName);
        }

        // console.log('ServerRequests: событие[' + eventName + '] зарегистрировано!');
        return this;
    }

    hasEvent(eventSought) {
        return this.events.some((eventName) => {
            if (eventName === eventSought) {
                return true;
            }
            return false;
        });
    }

    /**
     * @param {object} requestParameters.formElem   HTML Элемент формы.
     * @param {object} requestParameters.url        Принудительный адрес для отправки запроса, если будет неуказан, адрес возьмется из form.
     * @param {object} requestParameters.method     Принудительный метод для отправки запроса, если будет неуказан, адрес возьмется из form.
     * @param {function(object)} event.detail.requestDataPacker CallBack функция, которая будет принимать, объект ( класса FormData)
     *                                                          в качестве параметров для упаковки в запрос. И возвращать результат
     * @param {function(string)} requestParameters.responseHandler  CallBack функция, которая принимает ответ в виде строки.
     */
    request(requestType, requestParameters = {}) {
        if (typeof requestType !== 'string') {
            throw new ServerRequestsError('Параметр requestType не является строкой.');
        }

        if (!this.events.includes(requestType)) {
            throw new ServerRequestsError('Событие[ requestType ] - ненайдено.');
        }

        document.dispatchEvent(
            new CustomEvent(requestType, {
                detail: requestParameters,
            }),
        );
        return this;
    }
}
