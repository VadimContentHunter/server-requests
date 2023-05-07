import { RequestEvent } from '../interfaces/RequestEvent.js';
import { ServerRequestsError } from '../errors/ServerRequestsError.js';

export class RequestForms extends RequestEvent {
    #formElem;

    constructor() {
        super();
        // console.log('Обработчик RequestForms - создан.');
    }

    set formElem(value) {
        if (!(value instanceof HTMLFormElement)) {
            throw new ServerRequestsError('Значение value для formElem не является HTMLFormElement.');
        }

        this.#formElem = value;
    }

    get formElem() {
        if (!(this.#formElem instanceof HTMLFormElement)) {
            throw new ServerRequestsError('Поле formElem не является HTMLFormElement.');
        }

        return this.#formElem;
    }

    /**
     * @param {object} requestParameters.formElem   HTML Элемент формы.
     * @param {object} requestParameters.url        Принудительный адрес для отправки запроса, если будет неуказан, адрес возьмется из form.
     * @param {object} requestParameters.method     Принудительный метод для отправки запроса, если будет неуказан, адрес возьмется из form.
     * @param {function(object)} event.detail.requestDataPacker CallBack функция, которая будет принимать, объект ( класса FormData)
     *                                                          в качестве параметров для упаковки в запрос. И возвращать результат
     * @param {function(string)} requestParameters.responseHandler  CallBack функция, которая принимает ответ в виде строки.
     */
    handleEvent(event) {
        // console.log('RequestForms.handleEvent(event).');

        this.formElem = event?.detail?.formElem ?? null;
        this.url = typeof event?.detail?.url === 'string' ? typeof event.detail.url : this.getUrlForm();
        this.method = typeof event?.detail?.method === 'string' ? event.detail.method : this.getMethodForm();
        this.requestDataPacker = event?.detail?.requestDataPacker ?? null;
        this.responseHandler = event?.detail?.responseHandler ?? null;

        this.params = this.requestDataPacker(this.getValuesForm()) ?? null;
        this.request();
    }

    getValuesForm() {
        return new FormData(this.formElem);
    }

    getUrlForm() {
        if (this.formElem.hasAttribute('action') && this.formElem.getAttribute('action') !== '') {
            return this.formElem.getAttribute('action');
        }

        throw new ServerRequestsError('В форме неуказан action!');
    }

    getMethodForm() {
        if (this.formElem.hasAttribute('method') && this.formElem.getAttribute('method') !== '') {
            return this.formElem.getAttribute('method');
        }

        throw new ServerRequestsError('В форме неуказан method!');
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
