import { RequestEvent } from '../interfaces/RequestEvent.js';
import { ServerRequestsError } from '../errors/ServerRequestsError.js';

export class RequestBase extends RequestEvent {
    #objectForDataPacker = {};

    constructor() {
        super();
        // console.log('Обработчик RequestForms - создан.');
    }

    set objectForDataPacker(value) {
        if (typeof value !== 'object') {
            throw new ServerRequestsError('Данные objectForDataPacker - не являются объектом!');
        }

        this.#objectForDataPacker = value;
    }

    get objectForDataPacker() {
        if (typeof this.#objectForDataPacker !== 'object') {
            throw new ServerRequestsError('Данные objectForDataPacker - не являются объектом!');
        }

        return this.#objectForDataPacker;
    }

    /**
     * @param {object} requestParameters.url        Принудительный адрес для отправки запроса.
     * @param {object} requestParameters.method     Принудительный метод для отправки запроса, по умолчанию POST.
     * @param {function(object)} event.detail.requestDataPacker CallBack функция, которая будет принимать, объект
     *                                                          в качестве параметров для упаковки в запрос. И возвращать результат.
     * @param {function(object)} event.detail.objectForDataPacker   Объект c параметрами, который передается в упаковщик данных.
     * @param {function(string)} requestParameters.responseHandler  CallBack функция, которая принимает ответ в виде строки.
     */
    handleEvent(event) {
        if (typeof event?.detail?.url === 'string') {
            this.url = event.detail.url;
        } else {
            throw new ServerRequestsError('Не удалось найти url для отправки запроса!');
        }

        if (typeof event?.detail?.method === 'string') {
            this.method = event.detail.method;
        }

        this.objectForDataPacker = event.detail.objectForDataPacker;
        this.requestDataPacker = event?.detail?.requestDataPacker ?? null;
        this.responseHandler = event?.detail?.responseHandler ?? null;

        this.params = this.requestDataPacker(this.objectForDataPacker);
        this.request();
    }

    async request() {
        await fetch(this.url, {
            method: this.method,
            body: this.params,
        })
            .then((response) => response.json())
            .then((jsonData) => {
                this.responseHandler(jsonData);
            })
            .catch((error) => {
                throw new ServerRequestsError('Не удалось преобразовать ответ в json!');
            });
    }
}
